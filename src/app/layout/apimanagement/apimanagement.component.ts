import { Component, OnInit } from '@angular/core';
import { CricapiService } from '../../shared/services/cricapi.service';
import { Match } from '../../shared/model/match.model';
import { MatchService } from '../../shared/services/match.service';
import * as moment from 'moment';
import { PredictionService } from '../../shared/services/prediction.service';
import { Result } from '../../shared/model/result.model';
import { ResultService } from '../../shared/services/result.service';
import { UserService } from '../../shared/services/user.service';

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
    this.matchService.getYesterdayMatches().subscribe(data => {
      data.forEach(match => {
        if ( "winner_team" in match ) {
          let result = new Result();
          result.match_id = match.unique_id;
          //Get Predictions for the match
          this.predictionService.getPredictionsByMatch(match.unique_id).subscribe(predictions => {
            //Calculate Points for Winner
            let loserCount = 0;
            let winningUsers: string[] = [];
            predictions.forEach(pred => {
              if (pred.prediction == match.winner_team) {
                winningUsers.push(pred.user);
              } else {
                ++loserCount;
              }
            });
            result.winners = winningUsers;
            result.pointsToWinner = predictions.length - loserCount;
            console.log("Match id: " + match.unique_id + " Points to Winner: " + result.pointsToWinner);
            //Save Result
            this.resultService.createResult(result);
            //Update User Points
            winningUsers.forEach(user => {
              this.userService.updateUserPoints(user, result.pointsToWinner);
            })
          });
        }
        
      })
    });
  }

  testFunction() {
    this.cricapiService.getMatches().subscribe(
      data => {
        this.apiMatches = new Map(Object.entries(data)).get('matches');
        this.apiMatches.forEach(element => {
          if (element.type == "Twenty20"){
            console.log(element);
            var todayDate = Date.now();
            var elementDate = new Date(element.date);
            if (moment(todayDate).isSame(elementDate, 'day')) {
              //create new match
              //this.matchService.createMatch(element);
              //return;
            }
            if(moment(elementDate).isBefore(todayDate, 'day')){
              //update match record
              //console.log(moment(elementDate).isBefore(todayDate, 'day'));
              //this.matchService.updateMatch(element);
            }
          }
        });
      });
  }

  log(e: string) {
    this.displayLog += "\n" + e;
    console.log(e);
  }
}
