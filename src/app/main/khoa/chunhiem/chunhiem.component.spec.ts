import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunhiemComponent } from './chunhiem.component';

describe('ChunhiemComponent', () => {
  let component: ChunhiemComponent;
  let fixture: ComponentFixture<ChunhiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunhiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunhiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
