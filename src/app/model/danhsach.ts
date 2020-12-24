import { logging } from 'protractor';
export class dscanbo{
            maCbgv   :string;
            maPk   : string    ;
            maBmtt   : string    ;
            maNgach   :   number  ;
            maBac   :   number  ;
            maTdhv   :    number ;
            maKtkl   : number    ;
            hoVaTen   :  string   ;
            image   :  string   ;
            ngaySinh   :   Date  ;
            gioiTinh   :    number ;
            matKhau   :   string  ;
            dienThoai   :string;
            mail   :string;
            chucDanh   :string;
            soTaiKhoan   :string;
            status   :  number   ;
            quyen   :   number  ;
            queQuan   :string;
            danToc   :string;
            tonGiao   :string;
            trinhDo   :string;
            kinhNghiem   :string;
            ngayTao   :   Date  ;
            nguoiTao   :   string  ;
}
export class dsphongkhoa{
    maPk   :   string  ;
    tenPhongKhoa   :   string  ;
    soLuongNhanSu   :   number  ;
    phanLoai   :   number  ;
    diaChi   :   string  ;
    dienThoai   :   string  ;
    email   :   string  ;
    webiste   :   string  ;
    ghiChu   :   string  ;
    ngayTao   :   Date  ;
    nguoiTao   :   string  ;
}
export class dsbomon{
  maBmtt : string ;
  tenBmtt : string ;
  maPk : string ;
  soLuongNhanSu : number ;
  phanLoai : number ;
  diaChi : string ;
  dienThoai : string ;
  email : string ;
  website : string ;
  ghiChu : string ;
  ngayTao : Date ;
  nguoiTao : string ;
}
export interface Product {
  // id?:string;
  // code?:string;
  // name?:string;
  // description?:string;
  // price?:number;
  // quantity?:number;
  // inventoryStatus?:string;
  // category?:string;
  // image?:string;
  // rating?:number;
          maCbgv  ? :string;
           maPk   ?: string    ;
           maBmtt ?  : string    ;
           maNgach ?  :   number  ;
           maBac  ? :   number  ;
           maTdhv  ? :    number ;
           maKtkl  ? : number    ;
           hoVaTen  ? :  string   ;
           image?   :  string   ;
           ngaySinh  ? :   Date  ;
           gioiTinh  ? :    number ;
           matKhau ?  :   string  ;
           dienThoai?   :string;
           email  ? :string;
           chucDanh  ? :string;
           soTaiKhoan  ? :string;
           status ?  :  number   ;
           quyen  ? :   number  ;
           queQuan ?  :string;
           danToc ?  :string;
           tonGiao ?  :string;
           trinhDo ?  :string;
           kinhNghiem ?  :string;
           ngayTao ?  :   Date  ;
          nguoiTao ?  :   string  ;
}
export class dsbacluong{
    MaBac : number ;
          tenBac : string ;
          heSoBacLg : number ;
          status : number ;
          nhomBac : string ;
          ngayTao : Date ;
          nguoiTao : string ;
}
export class dsluong{
  maLuong : number ;
  maBac : number ;
  mucLuong : number ;
  luongCb : number ;
  luongPc : number ;
  ngayNhan : string ;
  ngayTang : Date ;
  status : number ;
}
export class dskhenthuong{

}
// --------------------------------------------------//
  export class dangkilich{
    maDkgd: number;
	  maCbgv: string ;
	  maHp  : string ;
	  ngayDk:  Date;
	  ghiChu: string ;
	  status: number;

  }
  export class giaoviencn{
      maGvcn: number;
      maLop: string ;
      maCbgv: string ;
      batDau:  Date;
      ketThuc:  Date;
      hieuLuc: number;
      ghiChu: string ;
      ngayTao:  Date;
      nguoiTao: string ;

  }
  export class hopdongld{
    maHd: number;
	  maCbgv: string ;
	  loaiHd: string;
	  tuNgay:  Date;
	  denNgay:  Date;
	  ghiChu: string ;
	  status: number;

  }
  export class khenthuong{
    maKtkl: number;
	  tenKtkl: string;
	  lyDo: string ;
	  ngayKt:  Date;
	  hinhThuc: string;
	  ghiChu: string ;
	  status: number;

  }
    export class lophoc{
    maLop: string;
	  tenLop: string ;
	  maNganhHoc: string;
	  maKhoaQuanLy: string ;
	  nienKhoa: string ;
	  trinhDo: number;
	  he: number;
	  ngayNhapHoc:  Date;
	  siSo: number;
	  trangThai: number;
	  ghiChu: string ;
	  ngayTao:  Date;
	  nguoiTao: string ;
  }
  export class lylich{
    maLl: number;
	  maCbgv: string ;
	  tenLl: string;
	  loaiLl: string ;
	  linkBaiBao: string ;
	  ghichu: string ;
	  status: number;

  }
  export class ngachcongchuc{
    maNgach: number;
	  maSo: string;
	  tenNgach: string;
	  moTa: string;
	  status: number;
	  ngayTao:  Date;
	  nguoiTao: string
	  ghiChu: string ;
  }
  export class phieuthu {
    maPhieuThu: number;
	  soHieu: number;
	  namTaiKhoa: number;
	  maGiaoDich: string;
	  ngay:  Date;
	  moTa: string ;
	  nguoiThu: string ;
	  maNguoithu: string;
	  tongTien: string;
	  hoaDonDienTu: number;
	  ghiChu: string;
	  ngayTao:  Date;
	  nguoiTao: string ;
  }
    export class sinhvien{
    maSv: string;
	  hoVaTen:string;
	  ngaySinh:  Date;
	  gioiTinh: any;
	  danToc: string ;
	  soDinhDanh: string;
	  noiCap: string ;
	  ngayCap:  Date;
	  dienThoai: string;
	  email: string ;
	  matKhau: string;
	  quyen: number;
	  trangThai: number;
	  anh: string ;
	  ngayTao:  Date;
	  nguoiTao: string;
  }
  export class trinhdo{
    maTdhv: number;
	  tenHocVan: string;
	  namTotNghiêp:  Date;
	  chungChi: string;
	  chuyenNganhDaoTao: string;
	  donViCt: string;
	  tdtinHoc: string;
	  tdngoaiNgu: string;
	  soNamDay: string ;
	  status: number;
  }
