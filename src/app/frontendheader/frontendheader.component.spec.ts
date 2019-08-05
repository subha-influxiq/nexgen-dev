import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendheaderComponent } from './frontendheader.component';

describe('FrontendheaderComponent', () => {
  let component: FrontendheaderComponent;
  let fixture: ComponentFixture<FrontendheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
