import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiangdayComponent } from './giangday.component';

describe('GiangdayComponent', () => {
  let component: GiangdayComponent;
  let fixture: ComponentFixture<GiangdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiangdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiangdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
