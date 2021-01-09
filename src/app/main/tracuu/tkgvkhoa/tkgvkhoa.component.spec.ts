import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TkgvkhoaComponent } from './tkgvkhoa.component';

describe('TkgvkhoaComponent', () => {
  let component: TkgvkhoaComponent;
  let fixture: ComponentFixture<TkgvkhoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TkgvkhoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TkgvkhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
