import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HocvanComponent } from './hocvan.component';

describe('HocvanComponent', () => {
  let component: HocvanComponent;
  let fixture: ComponentFixture<HocvanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocvanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocvanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
