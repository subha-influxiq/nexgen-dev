import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBelkUploadComponent } from './crm-belk-upload.component';

describe('CrmBelkUploadComponent', () => {
  let component: CrmBelkUploadComponent;
  let fixture: ComponentFixture<CrmBelkUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmBelkUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBelkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
