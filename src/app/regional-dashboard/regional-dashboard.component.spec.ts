import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalDashboardComponent } from './regional-dashboard.component';

describe('RegionalDashboardComponent', () => {
  let component: RegionalDashboardComponent;
  let fixture: ComponentFixture<RegionalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
