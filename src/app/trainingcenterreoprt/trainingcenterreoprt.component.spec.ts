import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingcenterreoprtComponent } from './trainingcenterreoprt.component';

describe('TrainingcenterreoprtComponent', () => {
  let component: TrainingcenterreoprtComponent;
  let fixture: ComponentFixture<TrainingcenterreoprtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingcenterreoprtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingcenterreoprtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
