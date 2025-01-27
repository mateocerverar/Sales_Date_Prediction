import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDatePredictionViewComponent } from './sales-date-prediction-view.component';

describe('SalesDatePredictionViewComponent', () => {
  let component: SalesDatePredictionViewComponent;
  let fixture: ComponentFixture<SalesDatePredictionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesDatePredictionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesDatePredictionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
