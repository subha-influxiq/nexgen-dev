import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranningsectionComponent } from './tranningsection.component';

describe('TranningsectionComponent', () => {
  let component: TranningsectionComponent;
  let fixture: ComponentFixture<TranningsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranningsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranningsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
