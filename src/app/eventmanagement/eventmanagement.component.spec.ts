import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventmanagementComponent } from './eventmanagement.component';

describe('EventmanagementComponent', () => {
  let component: EventmanagementComponent;
  let fixture: ComponentFixture<EventmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
