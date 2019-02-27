import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalcontractComponent } from './digitalcontract.component';

describe('DigitalcontractComponent', () => {
  let component: DigitalcontractComponent;
  let fixture: ComponentFixture<DigitalcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
