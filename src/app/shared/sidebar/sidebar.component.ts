import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/lib/authentication.service';
declare let $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public user: any;
  public menus = [{
                    name :'Người dùng',
                    url:'',
                    icon:'user',
                    childs:[{
                      name:'Quản lý người dùng', url:'user/user'
                  },
                  {
                    name:'Đăng xuất', url:''
                  },
                  {
                    name:'Đăng nhập', url:'/login'
                  }
                  ]},
                  {
                    name:'Phiếu thu',
                    url:'',
                    icon:'receipts',
                    childs:[{
                      name:'Quản lý phiếu thu',url:'/phieuthu/phieuthu'
                    }
                  ]},
                  {
                    name:'Giáo viên',
                    url:'',
                    icon:'address-book',
                    childs:[{
                        name:'Quản lý giáo viên',url:'/giaovien/giaovien'
                      },
                      {
                        name:'Quản lý cán bộ',url:'/giaovien/canbogv'
                      },
                      {
                        name:'Bậc Lương',url:'/giaovien/bacluong'
                      },
                      {
                        name:'Lương',url:'/giaovien/luong'
                      },
                      {
                        name:'Hợp Đồng',url:'/giaovien/hopdonggv'
                      },
                      {
                        name:'Lý Lịch GV',url:'/giaovien/lylichgv'
                      },
                    ]},
                  {
                    name:'Khoa',
                    url:'',
                    icon:'archway',
                    childs:[{
                      name:'QL Phòng Khoa',url:'/khoa/phongkhoa'
                    },
                    {
                      name:'QL Bộ Môn',url:'/khoa/bomon'
                    },
                    {
                      name:'Chủ Nhiệm',url:'/khoa/chunhiem'
                    },
                  ]},
                  {
                    name:'Giảng Dạy',
                    url:'',
                    icon:'archway',
                    childs:[{
                      name:'Đăng Kí Lich',url:'/giangday/dangkigd'
                    },
                    {
                      name:'Học Vấn',url:'/giangday/hocvan'
                    },
                    {
                      name:'Khen Thưởng Kỉ Luật',url:'/giangday/khenthuong'
                    },
                  ]}
                ];


  constructor(private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
    this.user=this.authenticationService.userValue;
  }
}
