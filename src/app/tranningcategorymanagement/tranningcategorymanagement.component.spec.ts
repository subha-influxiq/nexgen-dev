import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranningcategorymanagementComponent } from './tranningcategorymanagement.component';

describe('TranningcategorymanagementComponent', () => {
  let component: TranningcategorymanagementComponent;
  let fixture: ComponentFixture<TranningcategorymanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranningcategorymanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranningcategorymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
