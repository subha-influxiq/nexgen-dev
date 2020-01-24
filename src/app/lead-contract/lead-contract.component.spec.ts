import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadContractComponent } from './lead-contract.component';

describe('LeadContractComponent', () => {
  let component: LeadContractComponent;
  let fixture: ComponentFixture<LeadContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
