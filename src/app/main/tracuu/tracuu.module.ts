import { TracuuComponent } from './tracuu/tracuu.component';
import { TkgvkhoaComponent } from './tkgvkhoa/tkgvkhoa.component';
import { TkgvnuComponent } from './tkgvnu/tkgvnu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from './../../app.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    SharedModule,
    RouterModule.forChild([
      {
        path: 'tracuu1',
        component: TracuuComponent ,
      },
      {
        path: 'tkgvkhoa',
        component: TkgvkhoaComponent,
      },
      {
        path: 'tkgvnu',
        component: TkgvnuComponent,
      }
    ]),
  ]
})
export class TracuuModule { }
