import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageleadsComponent } from './manageleads.component';

describe('ManageleadsComponent', () => {
  let component: ManageleadsComponent;
  let fixture: ComponentFixture<ManageleadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageleadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
