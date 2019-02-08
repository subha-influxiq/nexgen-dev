import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepDashboardComponent } from './rep-dashboard.component';

describe('RepDashboardComponent', () => {
  let component: RepDashboardComponent;
  let fixture: ComponentFixture<RepDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
