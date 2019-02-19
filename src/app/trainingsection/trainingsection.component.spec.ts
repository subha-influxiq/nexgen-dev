import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsectionComponent } from './trainingsection.component';

describe('TrainingsectionComponent', () => {
  let component: TrainingsectionComponent;
  let fixture: ComponentFixture<TrainingsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
