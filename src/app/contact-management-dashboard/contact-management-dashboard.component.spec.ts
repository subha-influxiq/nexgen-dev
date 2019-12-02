import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactManagementDashboardComponent } from './contact-management-dashboard.component';

describe('ContactManagementDashboardComponent', () => {
  let component: ContactManagementDashboardComponent;
  let fixture: ComponentFixture<ContactManagementDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactManagementDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
