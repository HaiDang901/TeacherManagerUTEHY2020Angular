import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopdonggvComponent } from './hopdonggv.component';

describe('HopdonggvComponent', () => {
  let component: HopdonggvComponent;
  let fixture: ComponentFixture<HopdonggvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdonggvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdonggvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
