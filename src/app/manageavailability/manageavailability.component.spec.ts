import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageavailabilityComponent } from './manageavailability.component';

describe('ManageavailabilityComponent', () => {
  let component: ManageavailabilityComponent;
  let fixture: ComponentFixture<ManageavailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageavailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
