import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempaccessComponent } from './tempaccess.component';

describe('TempaccessComponent', () => {
  let component: TempaccessComponent;
  let fixture: ComponentFixture<TempaccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempaccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
