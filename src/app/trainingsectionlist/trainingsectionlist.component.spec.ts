import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsectionlistComponent } from './trainingsectionlist.component';

describe('TrainingsectionlistComponent', () => {
  let component: TrainingsectionlistComponent;
  let fixture: ComponentFixture<TrainingsectionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsectionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsectionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
