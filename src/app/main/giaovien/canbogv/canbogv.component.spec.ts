import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbogvComponent } from './canbogv.component';

describe('CanbogvComponent', () => {
  let component: CanbogvComponent;
  let fixture: ComponentFixture<CanbogvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanbogvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbogvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
