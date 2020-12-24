import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhieuthuComponent } from './phieuthu/phieuthu.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ 
  PhieuthuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'phieuthu',
        component: PhieuthuComponent,
      },
  ]),  
  ]
})
export class PhieuThuModule { }
