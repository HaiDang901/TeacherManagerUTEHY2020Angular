import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaComponent } from './khoa.component';

describe('KhoaComponent', () => {
  let component: KhoaComponent;
  let fixture: ComponentFixture<KhoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
