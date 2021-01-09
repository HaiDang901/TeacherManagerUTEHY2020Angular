import { TracuuComponent } from './tracuu/tracuu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from './../../app.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [TracuuComponent],
  imports: [
    CommonModule,
    SharedModule,
    ModalModule.forRoot(),
  //   RouterModule.forChild([
  //     {
  //       path: '',
  //       component: TracuuComponent,
  //     },
  // ]),
  ]
})
export class DashboardModule { }
