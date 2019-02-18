import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendfooterComponent } from './frontendfooter.component';

describe('FrontendfooterComponent', () => {
  let component: FrontendfooterComponent;
  let fixture: ComponentFixture<FrontendfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
