import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalRecruiterComponent } from './regional-recruiter.component';

describe('RegionalRecruiterComponent', () => {
  let component: RegionalRecruiterComponent;
  let fixture: ComponentFixture<RegionalRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
