import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegaldoclistComponent } from './legaldoclist.component';

describe('LegaldoclistComponent', () => {
  let component: LegaldoclistComponent;
  let fixture: ComponentFixture<LegaldoclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegaldoclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegaldoclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
