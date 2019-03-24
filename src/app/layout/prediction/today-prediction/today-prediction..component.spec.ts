import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayPredictionComponent } from './today-prediction.component';

describe('TodayPredictionComponent', () => {
  let component: TodayPredictionComponent;
  let fixture: ComponentFixture<TodayPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
