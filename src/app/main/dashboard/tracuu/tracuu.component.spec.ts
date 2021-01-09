import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracuuComponent } from './tracuu.component';

describe('TracuuComponent', () => {
  let component: TracuuComponent;
  let fixture: ComponentFixture<TracuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
