import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnellandingpageComponent } from './funnellandingpage.component';

describe('FunnellandingpageComponent', () => {
  let component: FunnellandingpageComponent;
  let fixture: ComponentFixture<FunnellandingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnellandingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnellandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
