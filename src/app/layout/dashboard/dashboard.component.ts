import { Component, OnInit } from '@angular/core';
import { Match } from '../../shared/model/match.model';
import { MatchService } from '../../shared/services/match.service';
import * as moment from 'moment';
import { PredictionService } from '../../shared/services/prediction.service';
import { Prediction } from '../../shared/model/prediction.model';
import { forEach } from '@angular/router/src/utils/collection';
import { auth } from 'firebase';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    
    public todayMatches: Match[];
    public userPredictions: Prediction[] = [];
    private user: firebase.User;
    public timeUp: boolean;
    public myPoints: number;
    public leaderPoints: number;
    public MINUTESBEFOREMATCH: number = 30;

    constructor(private matchService: MatchService, 
        private predictionService: PredictionService,
        private userService: UserService) {}

    ngOnInit() {
        this.user = auth().currentUser;
        if (this.user) {
            this.matchService.getTodayMatches().subscribe(data => {
                this.todayMatches = data;
                
                this.predictionService.getUserPredictions(this.user.uid).subscribe(data => {
                    this.userPredictions = data.map(e => {
                        return {
                        id: e.payload.doc.id,
                        ...e.payload.doc.data()
                        } as Prediction;
                    });
                    this.todayMatches.sort((a,b) => {
                        const aDate = new Date(a.dateTimeGMT);
                        const bDate = new Date(b.dateTimeGMT);
                        return aDate.getTime() - bDate.getTime();
                    });
                    this.todayMatches.forEach(match => {
                        match["displayDate"] = moment(match.date).format('Do MMMM YYYY');
                        if (this.userPredictions.find(e => 
                            (e.match_id == match.unique_id))){
                            var pred = this.userPredictions.find(e => e.match_id == match.unique_id);
                            if (pred) {
                                match["predValue"] = pred.prediction;
                            }
                        };
                        let matchDeadlineTime = moment.utc(match.dateTimeGMT).subtract(this.MINUTESBEFOREMATCH, 'minutes');
                        if (moment.utc().isBefore(matchDeadlineTime)) {
                            match["timeUp"] = false;
                        } else {
                            match["timeUp"] = true;
                        }
                    });
                });
            });
            this.userService.getUser(this.user.uid).subscribe(
                users => {
                    let loggedInUser = users[0].payload.doc.data();
                    this.myPoints = loggedInUser['points'];
                }
            );
            this.userService.getLeader().subscribe(
                users => {
                    let leader = users[0].payload.doc.data();
                    this.leaderPoints = leader['points'];
                }
            );
        }
    }

    OnToggleChanged(ev){
        console.log(ev);
        this.todayMatches.forEach(match => {
            if (match["team-1"]==ev) {
                this.savePrediction(match.unique_id, match["team-1"], match.date, match["team-1"] + ' vs ' + match["team-2"]);
            } else if (match["team-2"]==ev) {
                this.savePrediction(match.unique_id, match["team-2"], match.date, match["team-1"] + ' vs ' + match["team-2"]);
            }
        });
    }

    savePrediction(match_id, team, date, matchName) {
        var pred = {
            match_id: match_id,
            prediction: team,
            user: this.user.uid,
            date: date,
            match: matchName
        } as Prediction;
        this.createOrUpdatePrediction(pred, this.userPredictions);
    }

    createOrUpdatePrediction(pred: Prediction, userPreds: Prediction[]) {
        var IsUpdated = false;
        for (let up of userPreds) {
            if (up.match_id == pred.match_id){
                up.prediction = pred.prediction;
                this.predictionService.updatePrediction(up);
                IsUpdated = true;
                break;
            } else {
                IsUpdated = false;
            }
        }
        if (!IsUpdated) {
            this.predictionService.createPrediction(pred);
        }
    }
}
