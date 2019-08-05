import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepdetailsComponent } from './repdetails.component';

describe('RepdetailsComponent', () => {
  let component: RepdetailsComponent;
  let fixture: ComponentFixture<RepdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
