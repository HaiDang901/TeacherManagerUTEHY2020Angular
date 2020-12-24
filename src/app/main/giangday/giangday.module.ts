import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppModule } from './../../app.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { KhenthuongComponent } from './khenthuong/khenthuong.component';
import { HocvanComponent } from './hocvan/hocvan.component';
import { DangkigdComponent } from './dangkigd/dangkigd.component';

@NgModule({
  declarations: [DangkigdComponent, KhenthuongComponent, HocvanComponent],
  imports: [
    CommonModule,
    SharedModule,
    ModalModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'dangkigd',
        component: DangkigdComponent,
      },
      {
        path: 'hocvan',
        component: HocvanComponent,
      },
      {
        path: 'khenthuong',
        component: KhenthuongComponent,
      }
  ]),
  ]
})
export class GiangdayModule { }
