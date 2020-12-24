import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BomonComponent } from './bomon.component';

describe('BomonComponent', () => {
  let component: BomonComponent;
  let fixture: ComponentFixture<BomonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BomonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BomonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
