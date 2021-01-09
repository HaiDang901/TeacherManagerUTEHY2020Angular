import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TkgvnuComponent } from './tkgvnu.component';

describe('TkgvnuComponent', () => {
  let component: TkgvnuComponent;
  let fixture: ComponentFixture<TkgvnuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TkgvnuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TkgvnuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
