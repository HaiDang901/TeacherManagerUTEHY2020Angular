import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongkhoaComponent } from './phongkhoa.component';

describe('PhongkhoaComponent', () => {
  let component: PhongkhoaComponent;
  let fixture: ComponentFixture<PhongkhoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongkhoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongkhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
