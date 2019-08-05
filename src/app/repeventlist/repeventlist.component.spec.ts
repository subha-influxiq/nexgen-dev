import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeventlistComponent } from './repeventlist.component';

describe('RepeventlistComponent', () => {
  let component: RepeventlistComponent;
  let fixture: ComponentFixture<RepeventlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeventlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeventlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
