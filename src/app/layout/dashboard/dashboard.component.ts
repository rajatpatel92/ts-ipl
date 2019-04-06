import { Component, OnInit } from '@angular/core';
import { Match } from '../../shared/model/match.model';
import { MatchService } from '../../shared/services/match.service';
import * as moment from 'moment';
import { PredictionService } from '../../shared/services/prediction.service';
import { Prediction } from '../../shared/model/prediction.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    
    public todayMatches: Match[];
    public userPredictions: Prediction[] = [];

    constructor(private matchService: MatchService, private predictionService: PredictionService) {}

    ngOnInit() {
        this.matchService.getTodayMatches().subscribe(data => {
            this.todayMatches = data;
            this.todayMatches.forEach(match => {
                match["displayDate"] = moment(match.date).format('Do MMMM YYYY');
            });
        });
        this.predictionService.getUserPredictions('YISY').subscribe(data => {
            this.userPredictions = data.map(e => {
                return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
                } as Prediction;
            });
        });
    }

    OnToggleChanged(ev){
        console.log(ev);
        this.todayMatches.forEach(match => {
            if (match["team-1"]==ev) {
                this.savePrediction(match.unique_id, match["team-1"], match.date);
            } else if (match["team-2"]==ev) {
                this.savePrediction(match.unique_id, match["team-2"], match.date);
            }
        });
    }

    savePrediction(match_id, team, date) {
        var pred = {
            match_id: match_id,
            prediction: team,
            user: 'YISY',
            date: date,
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
