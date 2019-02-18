import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendhomeComponent } from './frontendhome.component';

describe('FrontendhomeComponent', () => {
  let component: FrontendhomeComponent;
  let fixture: ComponentFixture<FrontendhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
