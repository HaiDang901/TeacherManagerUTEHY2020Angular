import { AppModule } from './../../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GiaovienComponent } from './giaovien/giaovien.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CanbogvComponent } from './canbogv/canbogv.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BacluongComponent } from './bacluong/bacluong.component';
import { LuongComponent } from './luong/luong.component';
import { HopdonggvComponent } from './hopdonggv/hopdonggv.component';
import { LylichgvComponent } from './lylichgv/lylichgv.component';

@NgModule({
  declarations: [GiaovienComponent, CanbogvComponent, BacluongComponent, LuongComponent, HopdonggvComponent, LylichgvComponent],
  imports: [
    CommonModule,
    SharedModule,
    ModalModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'giaovien',
        component: GiaovienComponent,
      },
      {
        path: 'canbogv',
        component: CanbogvComponent,
      },
      {
        path: 'bacluong',
        component: BacluongComponent,
      },
      {
        path: 'luong',
        component: LuongComponent,
      },
      {
        path: 'hopdonggv',
        component: HopdonggvComponent,
      },
      {
        path: 'lylichgv',
        component: LylichgvComponent,
      },

  ]),
  ]
})
export class GiaovienModule { }
