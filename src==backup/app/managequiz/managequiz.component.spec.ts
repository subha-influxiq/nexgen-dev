import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagequizComponent } from './managequiz.component';

describe('ManagequizComponent', () => {
  let component: ManagequizComponent;
  let fixture: ComponentFixture<ManagequizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagequizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagequizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
