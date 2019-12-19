import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeContractComponent } from './make-contract.component';

describe('MakeContractComponent', () => {
  let component: MakeContractComponent;
  let fixture: ComponentFixture<MakeContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
