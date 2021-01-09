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
                    icon:'file-invoice-dollar',
                    childs:[{
                      name:'Quản lý phiếu thu',url:'/phieuthu/phieuthu'
                    }
                  ]},
                  {
                    name:'Giáo viên',
                    url:'',
                    icon:'chalkboard-teacher',
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
                    icon:'school',
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
                    icon:'book-reader',
                    childs:[{
                      name:'Đăng Kí Lich',url:'/giangday/dangkigd'
                    },
                    {
                      name:'Học Vấn',url:'/giangday/hocvan'
                    },
                    {
                      name:'Khen Thưởng Kỉ Luật',url:'/giangday/khenthuong'
                    },
                  ]},
                  {
                    name:'Tra Cứu',
                    url:'',
                    icon:'search',
                    childs:[{
                      name:'Tra Cứu',url:'/tracuu/tracuu1'
                    },
                    {
                      name:'Thống kê',url:'/tracuu/tkgvkhoa'
                    },
                    {
                      name:'Số Lượng Nhân Sự',url:'/tracuu/tkgvnu'
                    },
                  ]}
                ];


  constructor(private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
    this.user=this.authenticationService.userValue;
  }
}
