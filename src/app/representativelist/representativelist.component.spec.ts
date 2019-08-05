import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativelistComponent } from './representativelist.component';

describe('RepresentativelistComponent', () => {
  let component: RepresentativelistComponent;
  let fixture: ComponentFixture<RepresentativelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentativelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
