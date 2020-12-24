
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../lib/auth.guard';
import { Role } from '../models/role';
import { SharedModule } from '../shared/shared.module';
import { UnauthorizedComponent } from '../shared/unauthorized/unauthorized.component';
import { FileNotFoundComponent } from '../shared/file-not-found/file-not-found.component';
import { GiaovienComponent } from './giaovien/giaovien.component';
import { KhoaComponent } from './khoa/khoa.component';
import { GiangdayComponent } from './giangday/giangday.component';
// import { DangkigdComponent } from './giangday/dangkigd/dangkigd.component';
// import { KhenthuongComponent } from './giangday/khenthuong/khenthuong.component';
// import { HocvanComponent } from './giangday/hocvan/hocvan.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'not-found',
        component: FileNotFoundComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        // canActivate: [RoleGuard],
        // data: { roles: [Role.Admin] },
      },
      {
        path: 'phieuthu',
        loadChildren: () =>
          import('./phieuthu/phieuthu.module').then((m) => m.PhieuThuModule),
        // canActivate: [RoleGuard],
        // data: { roles: [Role.Admin, Role.User] },
      },
      {
        path: 'giaovien',
        loadChildren: () =>
          import('./giaovien/giaovien.module').then((m) => m.GiaovienModule),
        // canActivate: [RoleGuard],
        // data: { roles: [Role.Admin, Role.User] },
      },
      {
        path: 'giangday',
        loadChildren: () =>
          import('./giangday/giangday.module').then((m) => m.GiangdayModule),
        // canActivate: [RoleGuard],
        // data: { roles: [Role.Admin, Role.User] },
      },
      {
        path: 'khoa',
        loadChildren: () =>
          import('./khoa/khoa.module').then((m) => m.KhoaModule),
        // canActivate: [RoleGuard],
        // data: { roles: [Role.Admin, Role.User] },
      }

    ],
  },
];
@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    MainComponent,
    GiaovienComponent,
    KhoaComponent,
    GiangdayComponent,
    // DangkigdComponent,
    // KhenthuongComponent,
    // HocvanComponent
  ],
  imports: [SharedModule, CommonModule, RouterModule.forChild(mainRoutes)],
})
export class MainModule {}
