import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LylichgvComponent } from './lylichgv.component';

describe('LylichgvComponent', () => {
  let component: LylichgvComponent;
  let fixture: ComponentFixture<LylichgvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LylichgvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LylichgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
