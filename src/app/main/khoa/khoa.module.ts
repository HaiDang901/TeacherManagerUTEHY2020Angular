import { AppModule } from './../../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhongkhoaComponent } from './phongkhoa/phongkhoa.component';
import { BomonComponent } from './bomon/bomon.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChunhiemComponent } from './chunhiem/chunhiem.component';


@NgModule({
  declarations: [PhongkhoaComponent, BomonComponent, ChunhiemComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    SharedModule,
    RouterModule.forChild([
      {
        path: 'phongkhoa',
        component: PhongkhoaComponent,
      },
      {
        path: 'bomon',
        component: BomonComponent,
      },
      {
        path: 'chunhiem',
        component: ChunhiemComponent,
      }
    ]),
  ]
})
export class KhoaModule { }
