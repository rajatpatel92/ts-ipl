import { Component, OnInit } from '@angular/core';
import { CricapiService } from '../../shared/services/cricapi.service';
import { Match } from '../../shared/model/match.model';
import { MatchService } from '../../shared/services/match.service';
import * as moment from 'moment';
import { PredictionService } from '../../shared/services/prediction.service';
import { Result } from '../../shared/model/result.model';
import { ResultService } from '../../shared/services/result.service';
import { UserService } from '../../shared/services/user.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-apimanagement',
  templateUrl: './apimanagement.component.html',
  styleUrls: ['./apimanagement.component.scss']
})
export class ApimanagementComponent implements OnInit {
  
  apiMatches: Match[];
  displayLog: string = "";

  constructor(private cricapiService: CricapiService, 
    private matchService: MatchService, 
    private predictionService: PredictionService,
    private resultService: ResultService,
    private userService: UserService) { }

  ngOnInit() {
        
  }

  updateLocalMatches() {
    this.log("Updating Yesterday Matches...");
    var apiMatches;
    this.cricapiService.getMatches().subscribe(matches => {
      apiMatches = new Map(Object.entries(matches)).get('matches');
      this.log("Retrieved matches from API...");
      this.log("Updating Local Matches in Database...");
      //Now update local matches database
      this.matchService.getYesterdayMatches().subscribe(data => {
        data.forEach(element => {
          this.updateResults(element, apiMatches);
        });
        this.log("Done");
      });
    });
  }

  updateResults(yesterdayMatch: Match, apiMatches: any[]) {
    apiMatches.forEach(element => {
      if (element.unique_id == yesterdayMatch.unique_id) {
        if ("winner_team" in element) {
          this.log("Updating Winner for match : " + element.unique_id);
          yesterdayMatch.winner_team = element.winner_team;
          this.matchService.updateMatch(yesterdayMatch);
        } else {
          console.log("Yesterday winner not announced yet for the match - " + yesterdayMatch.unique_id);
        }
      }
    });
  }

  updatePoints() {
    this.matchService.getYesterdayMatches().subscribe(async data => {
      for (let match of data) {
        //Only update points if winner is available and points are not alreday calculated
        if ( ("winner_team" in match)) {
          //Check if result record already exists for the match
          const resultDocRef = this.resultService.getDocRef(match['unique_id'].toString());
          await resultDocRef.get().subscribe(
            async resultDoc => {
              if (resultDoc.exists) {
                this.log("Points already calculated for the match:" + match.unique_id + ", Skipping calculation...");
                return null;
              } else {
                let result = new Object();
                result['match_id'] = match.unique_id;
                //Get Predictions for the match
                await this.predictionService.getPredictionsByMatch(match.unique_id).subscribe(
                  async predictions => {
                    //Calculate Points for Winner
                    let winningUsers: string[] = [];
                    predictions.forEach(pred => {
                      if (pred.prediction == match.winner_team) {
                        winningUsers.push(pred.user);
                      }
                    });
                    result['winners'] = winningUsers;
                    result['pointsToWinner'] = environment.appConfig.totalPlayers - winningUsers.length;
                    this.log("Match id: " + match.unique_id + " Points to Winner: " + result['pointsToWinner']);
                    //Save Result
                    await this.resultService.createResult(result);
                    //Update User Points
                    await winningUsers.forEach(user => {
                      this.log("User: " + user + " Points to be Added: " + result['pointsToWinner']);
                      this.userService.updateUserPoints(user, result['pointsToWinner']);
                    });
                  },
                  error => this.log(error));
              }
            }, error => this.log(error));
        } else {
          this.log("No points updated for match : " + match['unique_id'] + " (Winner is not announced yet...!!)");
        }
      }
    });
  }

  log(e: string) {
    this.displayLog += "\n" + e;
    console.log(e);
  }
}
