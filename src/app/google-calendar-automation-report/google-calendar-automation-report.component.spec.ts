import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCalendarAutomationReportComponent } from './google-calendar-automation-report.component';

describe('GoogleCalendarAutomationReportComponent', () => {
  let component: GoogleCalendarAutomationReportComponent;
  let fixture: ComponentFixture<GoogleCalendarAutomationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleCalendarAutomationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleCalendarAutomationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
