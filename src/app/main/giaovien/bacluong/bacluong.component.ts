import { CoreService } from './../../../lib/core.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/lib/api.service';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { dsbacluong, dscanbo, dsphongkhoa, dsbomon} from '../../../model/danhsach';
declare var $: any;

@Component({
  selector: 'app-bacluong',
  templateUrl: './bacluong.component.html',
  styleUrls: ['./bacluong.component.css']
})
export class BacluongComponent extends BaseComponent implements OnInit  {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dsbacluongs: any;
  public totalRecords: any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public dsluong:any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  public hiddenID: number;
  submitted = false;

  first = 0;

  rows = 5;


  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private apiService: ApiService, private fb: FormBuilder, injector: Injector,private coreService: CoreService) {
    super(injector);
  }

  dsbl: dsbacluong[];

  getdsBL(): void {
    this.apiService.getdsBL().subscribe((update) => {
      this.dsbl = update;
      console.log(this.dsbl);
    });
  }
  showAdd() {
    this.isCreate= true;
    this.hiddenID = 0;
    this.doneSetupForm = {};
    this.lgModal.show();
  }
  ngOnInit(): void {
    // this.getdsBL();
    this._api.get('/api/BacLuongs').subscribe(res=>{
    this.dsluong=res;
    console.log(this.dsluong);});


    this.formsearch = this.fb.group({
      'maBac': ['']
    });
    this.search();

    this.coreService.getCustomersLargeBL().then(customers => this.dsbacluongs = customers);
    this.search();
  }
  next() {
    this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.dsbacluongs ? this.first === (this.dsbacluongs.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.dsbacluongs ? this.first === 0 : true;
    }





  loadPage(page) {
    this._api.post('/api/BacLuongs', { page: page, pageSize: this.pageSize })
    .takeUntil(this.unsubscribe)
    .subscribe(res => {
      this.dsbacluongs = res.data;
      this.totalRecords = res.totalItems;
      this.pageSize = res.pageSize;
    });
  }
  search() {
    this._api.get('/api/BacLuongs')
    .takeUntil(this.unsubscribe)
    .subscribe(res => {
      this.dsbacluongs = res;
    });
  }


  get f() { return this.formdata.controls; }

  showEdit(id: any){
    this.isCreate = false;
    this.hiddenID = 1;
    this.apiService.getbyidBL(id).subscribe(res =>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  save(val: dsbacluong) {

    if (this.hiddenID == 0) {

      this.apiService.postBL(val).subscribe(res => {
        alert(" Them thanh cong!");
        this.lgModal.hide();
        this.getdsBL();
      });
    }
    else{
      this.apiService.updateBL(val.MaBac, val).subscribe(res =>{
        alert("Sửa thành công");
        this.lgModal.hide();
        this.getdsBL();
      });
    }
  }
  ChiTiet(id: any ){
    this.isCreate = true;
    this.apiService.getbyidBL(id).subscribe(res =>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id: any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.apiService.deleteBL(id).subscribe(res =>{
        alert("Xóa thành công");
        this.getdsBL();
      });
    }

  }
  Reset(){
    this.doneSetupForm ={};
  }
  // onSubmit(value) {
  //   this.submitted = true;
  //   if (this.formdata.invalid) {
  //     return;
  //   }
  //   if (this.isCreate) {
  //     this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
  //       let data_image = data == '' ? null : data;
  //       let tmp = {
  //         nguoiTao: value.nguoiTao,
  //         ngayTao: +value.ngayTao,
  //         kinhNghiem: value.kinhNghiem,
  //         maCbgv: value.maCbgv,
  //         maPk: value.maPk,
  //         maBmtt: value.maBmtt,
  //         maNgach: +value.maNgach,
  //         maBac: +value.maBac,
  //         maTdhv: +value.maTdhv,
  //         maKtkl: +value.maKtkl,
  //         hoVaTen: value.hoVaTen,
  //         ngaySinh: +value.ngaySinh,
  //         gioiTinh: +value.gioiTinh,
  //         matKhau: value.matKhau,
  //         email: value.email,
  //         soTaiKhoan: value.soTaiKhoan,
  //         dienThoai: value.dienThoai,
  //         chucDanh: value.chucDanh,
  //         status: +value.status,
  //         quyen: +value.quyen,
  //         queQuan: value.queQuan,
  //         danToc: value.danToc,
  //         tonGiao: value.tonGiao,
  //         trinhDo: value.trinhDo,
  //       };
  //       this._api.post('/api/TblCanBoGiangViens/createGV', tmp).takeUntil(this.unsubscribe).subscribe(res => {
  //         alert('Thêm thành công');
  //         this.search();
  //         this.lgModal.hide();
  //       });
  //     });
  //   }
  // }

  // Reset() {
  //   // this.dscanbo = null;
  //   this.formdata = this.fb.group({

  //     'nguoiTao': [''],
  //     'ngayTao': [this.today, Validators.required],
  //     'kinhNghiem': [''],
  //     'maCbgv': [''],
  //     'maPk': [''],
  //     'maBmtt': [''],
  //     'maNgach': [''],
  //     'maBac': [''],
  //     'maTdhv': [''],
  //     'maKtkl': [''],
  //     'hoVaTen': [''],
  //     'ngaySinh': [''],
  //     'gioiTinh': [''],
  //     'matKhau': [''],
  //     'email': [''],
  //     'soTaiKhoan': [''],
  //     'dienThoai': [''],
  //     'chucDanh': [''],
  //     'status': [''],
  //     'quyen': [''],
  //     'queQuan': [''],
  //     'danToc': [''],
  //     'tonGiao': [''],
  //     'trinhDo': [''],
  //   });
  // }

  // createModal() {
  //   debugger
  //   this.doneSetupForm = false;
  //   this.showUpdateModal = true;
  //   this.isCreate = true;
  //   // this.dscanbo = null;
  //   setTimeout(() => {
  //     $('#createGiaoVienModal').modal('toggle');
  //     this.formdata = this.fb.group({
  //       'nguoiTao': [''],
  //       'ngayTao': [this.today, Validators.required],
  //       'kinhNghiem': [''],
  //       'maCbgv': [''],
  //       'maPk': [''],
  //       'maBmtt': [''],
  //       'maNgach': [''],
  //       'maBac': [''],
  //       'maTdhv': [''],
  //       'maKtkl': [''],
  //       'hoVaTen': [''],
  //       'ngaySinh': [''],
  //       'gioiTinh': [''],
  //       'matKhau': [''],
  //       'email': [''],
  //       'soTaiKhoan': [''],
  //       'dienThoai': [''],
  //       'chucDanh': [''],
  //       'status': [''],
  //       'quyen': [''],
  //       'queQuan': [''],
  //       'danToc': [''],
  //       'tonGiao': [''],
  //       'trinhDo': [''],
  //     });
  //     this.formdata.get('ngayTao').setValue(this.today);
  //     this.formdata.get('gioiTinh').setValue(this.genders[0].value);
  //     this.formdata.get('status').setValue(this.status[0].value);
  //     this.doneSetupForm = true;
  //   });
  // }

  // public openUpdateModal(row) {
  //   this.doneSetupForm = false;
  //   this.showUpdateModal = true;
  //   this.isCreate = false;
  //   setTimeout(() => {
  //     $('#createGiaoVienModal').modal('toggle');
  //     this._api.get('/api/TblCanBoGiangViens/get-by-id/' + row.maCbgv).takeUntil(this.unsubscribe).subscribe((res: any) => {
  //       this.dscanbo = res;
  //       let ngayTao = new Date(this.dscanbo.ngayTao);
  //       let ngaySinh = new Date(this.dscanbo.ngaySinh);
  //       this.formdata = this.fb.group({
  //         'nguoiTao': ['NguoiTao'],
  //         'ngayTao':      [ngayTao, Validators.required],
  //         'kinhNghiem':   ['this.dscanbo.kinhNghiem'],
  //         'maCbgv' :      ['this.dscanbo.maCbgv'],
  //         'maPk'  :       ['this.dscanbo.maPk'],
  //         'maBmtt'   :    ['this.dscanbo.maBmtt'],
  //         'maNgach'   :   ['this.dscanbo.maNgach'],
  //         'maBac'   :     ['this.dscanbo.maBac'],
  //         'maTdhv'   :    ['this.dscanbo.maTdhv'],
  //         'maKtkl'   :    ['this.dscanbo.maKtkl'],
  //         'hoVaTen' :     ['this.dscanbo.hoVaTen'],
  //         'ngaySinh' :    [ngaySinh, Validators.required],
  //         'gioiTinh' :    ['this.dscanbo.gioiTinh'],
  //         'matKhau' :     ['this.dscanbo.matKhau'],
  //         'email':        ['this.dscanbo.email'],
  //         'soTaiKhoan' :  ['this.dscanbo.soTaiKhoan'],
  //         'dienThoai':    ['this.dscanbo.dienThoai'],
  //         'chucDanh':     ['this.dscanbo.chucDanh'],
  //         'status':       ['this.dscanbo.status'],
  //         'quyen':        ['this.dscanbo.quyen'],
  //         'queQuan':      ['this.dscanbo.queQuan'],
  //         'danToc':       ['this.dscanbo.danToc'],
  //         'tonGiao':      ['this.dscanbo.tonGiao'],
  //         'trinhDo':      ['this.dscanbo.trinhDo'],
  //       });
  //       this.doneSetupForm = true;
  //     });
  //   }, 700);
  // }

  // closeModal() {
  //   $('#createGiaoVienModal').closest('.modal').modal('hide');
  // }
}
