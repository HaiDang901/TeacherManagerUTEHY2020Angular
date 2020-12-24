import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
@Component({
  selector: 'app-phieuthu',
  templateUrl: './phieuthu.component.html',
  styleUrls: ['./phieuthu.component.css'],
})
export class PhieuthuComponent extends BaseComponent implements OnInit {
  public phieuthus: any;
  public phieuthu: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal:any;
  public isCreate:any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'MaGiaoDich': ['']
    });

   this.search();
  }

  loadPage(page) {
    this._api.post('/api/phieuthu/searchphieuthu',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.phieuthus = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  search() {
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/phieuthu/searchphieuthu',{page: this.page, pageSize: this.pageSize, MaGiaoDich: this.formsearch.get('MaGiaoDich').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.phieuthus = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  get f() { return this.formdata.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if(this.isCreate) {
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
           NamTaiKhoa:+value.NamTaiKhoa,
           Ngay:value.Ngay,
           MoTa:value.MoTa,
           NguoiThu:value.NguoiThu,
           MaNguoiThu:value.MaNguoiThu,
           TongTien:+value.TongTien,
           HoaDonDienTu:+value.HoaDonDienTu,
           GhiChu:value.GhiChu
          };
        this._api.post('/api/phieuthu/create-phieuthu',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
      });
    }
  }

  Reset() {
    this.phieuthu = null;
    this.formdata = this.fb.group({
      'Ngay': [this.today, Validators.required],
      'NamTaiKhoa': [''],
      'MoTa': [''],
      'NguoiThu': [''],
      'MaNguoiThu': [''],
      'TongTien': [''],
      'HoaDonDienTu': [this.hddt[0].value],
      'GhiChu': ['']
    });
  }

  createModal() {
    debugger
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.phieuthu = null;
    setTimeout(() => {
      $('#createPhieuThuModal').modal('toggle');
      this.formdata = this.fb.group({
        'Ngay': ['', Validators.required],
        'NamTaiKhoa': [''],
        'MoTa': [''],
        'NguoiThu': [''],
        'MaNguoiThu': [''],
        'TongTien': [''],
        'HoaDonDienTu': [''],
        'GhiChu': [''],
      });
      this.formdata.get('Ngay').setValue(this.today);
      this.formdata.get('HoaDonDienTu').setValue(this.hddt[0].value);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createPhieuThuModal').modal('toggle');
      this._api.get('/api/phieuthu/get-by-id/'+ row.maPhieuThu).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.phieuthu = res;
        let Ngay = new Date(this.phieuthu.ngay);
          this.formdata = this.fb.group({
            'SoHieu': [this.phieuthu.SoHieu],
            'Ngay': [Ngay, Validators.required],
            'NamTaiKhoa': [this.phieuthu.namTaiKhoa],
            'MaGiaoDich': [this.phieuthu.maGiaoDich],
            'MoTa': [this.phieuthu.moTa],
            'NguoiThu': [this.phieuthu.nguoiThu],
            'MaNguoiThu': [this.phieuthu.maNguoiThu],
            'TongTien': [this.phieuthu.tongTien],
            'HoaDonDienTu': [this.phieuthu.hoaDonDienTu],
            'GhiChu': [this.phieuthu.ghiChu]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createPhieuThuModal').closest('.modal').modal('hide');
  }
}
