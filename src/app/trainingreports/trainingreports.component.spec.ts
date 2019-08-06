import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingreportsComponent } from './trainingreports.component';

describe('TrainingreportsComponent', () => {
  let component: TrainingreportsComponent;
  let fixture: ComponentFixture<TrainingreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
