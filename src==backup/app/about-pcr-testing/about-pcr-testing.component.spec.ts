import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPcrTestingComponent } from './about-pcr-testing.component';

describe('AboutPcrTestingComponent', () => {
  let component: AboutPcrTestingComponent;
  let fixture: ComponentFixture<AboutPcrTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPcrTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPcrTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
