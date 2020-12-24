import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkigdComponent } from './dangkigd.component';

describe('DangkigdComponent', () => {
  let component: DangkigdComponent;
  let fixture: ComponentFixture<DangkigdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangkigdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkigdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
