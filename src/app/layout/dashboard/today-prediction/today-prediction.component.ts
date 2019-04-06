import { Component, OnInit } from '@angular/core';
import { PredictionService } from 'src/app/shared/services/prediction.service';
import { Prediction } from 'src/app/shared/model/prediction.model';
import { MatTableDataSource } from '@angular/material';
import { MatchService } from '../../../shared/services/match.service';

@Component({
  selector: 'app-today-prediction',
  templateUrl: './today-prediction.component.html',
  styleUrls: ['./today-prediction.component.scss']
})
export class TodayPredictionComponent implements OnInit {

  predictions: Prediction[];

  constructor(private predictionService: PredictionService, private matchService: MatchService) { }

  displayedColumns = ['match_id', 'prediction'];
  dataSource: MatTableDataSource<Prediction>;

  ngOnInit() {
    this.predictionService.getUserPredictions('YISY')
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
