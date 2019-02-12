import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccountsettingComponent } from './useraccountsetting.component';

describe('UseraccountsettingComponent', () => {
  let component: UseraccountsettingComponent;
  let fixture: ComponentFixture<UseraccountsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraccountsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraccountsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
