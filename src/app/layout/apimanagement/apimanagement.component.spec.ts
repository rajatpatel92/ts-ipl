import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApimanagementComponent } from './apimanagement.component';

describe('ApimanagementComponent', () => {
  let component: ApimanagementComponent;
  let fixture: ComponentFixture<ApimanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApimanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApimanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
