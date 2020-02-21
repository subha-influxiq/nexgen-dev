import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmLeadListsComponent } from './crm-lead-lists.component';

describe('CrmLeadListsComponent', () => {
  let component: CrmLeadListsComponent;
  let fixture: ComponentFixture<CrmLeadListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmLeadListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmLeadListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
