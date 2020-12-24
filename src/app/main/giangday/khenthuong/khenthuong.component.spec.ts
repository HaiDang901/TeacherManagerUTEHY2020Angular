import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhenthuongComponent } from './khenthuong.component';

describe('KhenthuongComponent', () => {
  let component: KhenthuongComponent;
  let fixture: ComponentFixture<KhenthuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhenthuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhenthuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
