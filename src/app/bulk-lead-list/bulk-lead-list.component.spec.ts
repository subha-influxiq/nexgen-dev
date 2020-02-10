import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkLeadListComponent } from './bulk-lead-list.component';

describe('BulkLeadListComponent', () => {
  let component: BulkLeadListComponent;
  let fixture: ComponentFixture<BulkLeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkLeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
