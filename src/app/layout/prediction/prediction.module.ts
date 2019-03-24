import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
    MatSliderModule, MatSlideToggleModule, MatButtonModule, MatButtonToggleModule, MatIconModule,
    MatPaginatorModule, MatSortModule, MatTableModule
} from '@angular/material';
import { TodayPredictionComponent } from './today-prediction/today-prediction.component';
import { FormsRoutingModule } from './prediction-routing.module';
import { PredictionComponent } from './prediction.component';

@NgModule({
    imports: [
        CommonModule,
        FormsRoutingModule,
        MatAutocompleteModule,
        FormModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSliderModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [
        PredictionComponent,
        TodayPredictionComponent
    ]
})
export class PredictionModule {}
