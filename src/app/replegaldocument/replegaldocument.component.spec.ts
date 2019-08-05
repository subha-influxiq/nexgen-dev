import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplegaldocumentComponent } from './replegaldocument.component';

describe('ReplegaldocumentComponent', () => {
  let component: ReplegaldocumentComponent;
  let fixture: ComponentFixture<ReplegaldocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplegaldocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplegaldocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
