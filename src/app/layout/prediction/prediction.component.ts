import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PredictionService } from '../../shared/services/prediction.service';
import { Prediction } from '../../shared/model/prediction.model';

@Component({
    selector: 'app-prediction',
    templateUrl: './prediction.component.html',
    styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit{
    predictions: Prediction[];
    constructor(private predictionService: PredictionService) {}

    displayedColumns = ['match_id', 'prediction'];
    dataSource: MatTableDataSource<Prediction>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    ngOnInit() {
        
        this.predictionService.getUserPredictions('YISY')
            .subscribe(
                data => {
                    this.predictions = data.map(e => {
                        return {
                        id: e.payload.doc.id,
                        ...e.payload.doc.data()
                        } as Prediction;
                    });
                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.predictions);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                });
    }
}
