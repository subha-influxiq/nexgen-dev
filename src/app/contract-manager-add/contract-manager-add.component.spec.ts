import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagerAddComponent } from './contract-manager-add.component';

describe('ContractManagerAddComponent', () => {
  let component: ContractManagerAddComponent;
  let fixture: ComponentFixture<ContractManagerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
