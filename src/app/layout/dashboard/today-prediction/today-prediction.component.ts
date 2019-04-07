import { Component, OnInit } from '@angular/core';
import { PredictionService } from 'src/app/shared/services/prediction.service';
import { Prediction } from 'src/app/shared/model/prediction.model';
import { MatTableDataSource } from '@angular/material';
import { MatchService } from '../../../shared/services/match.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-today-prediction',
  templateUrl: './today-prediction.component.html',
  styleUrls: ['./today-prediction.component.scss']
})
export class TodayPredictionComponent implements OnInit {

  predictions: Prediction[];

  constructor(private predictionService: PredictionService, private matchService: MatchService) { }

  displayedColumns = ['match', 'prediction'];
  dataSource: MatTableDataSource<Prediction>;

  ngOnInit() {
    var today = new Date();
    var user = auth().currentUser;
    if (user) {
      this.predictionService.getUserTodayPredictions(user.uid, today)
      .subscribe(data => {
        this.predictions = data.map(e => {
            return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
            } as Prediction;
        });
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.predictions);
      });
    }
  }
}
