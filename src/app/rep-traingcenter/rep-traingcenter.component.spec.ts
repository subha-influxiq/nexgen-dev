import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepTraingcenterComponent } from './rep-traingcenter.component';

describe('RepTraingcenterComponent', () => {
  let component: RepTraingcenterComponent;
  let fixture: ComponentFixture<RepTraingcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepTraingcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepTraingcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
