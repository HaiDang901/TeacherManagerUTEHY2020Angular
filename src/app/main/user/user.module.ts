import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { UserComponent } from './user/user.component';
import { RoleGuard } from '../../lib/auth.guard';
import { Role } from '../../models/role';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [UserComponent, UserComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'user',
        component: UserComponent,
      },
  ]),
  ]
})
export class UserModule { }
