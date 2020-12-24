import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacluongComponent } from './bacluong.component';

describe('BacluongComponent', () => {
  let component: BacluongComponent;
  let fixture: ComponentFixture<BacluongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
