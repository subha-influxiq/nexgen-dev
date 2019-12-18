import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagerListComponent } from './contract-manager-list.component';

describe('ContractManagerListComponent', () => {
  let component: ContractManagerListComponent;
  let fixture: ComponentFixture<ContractManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
