import { CoreService } from './../../../lib/core.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/lib/api.service';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {dscanbo, dsphongkhoa, dsbomon} from '../../../model/danhsach';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


declare var $: any;

@Component({
  selector: 'app-giaovien',
  templateUrl: './giaovien.component.html',
  styleUrls: ['./giaovien.component.css']
})
export class GiaovienComponent extends BaseComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dscanbos: any;
  // public dscanbo: any;
  public totalRecords: any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  public hiddenID:number;
  productDialog: boolean;
  selectedProducts: dscanbo[];
  submitted = false;

  first = 0;

  rows = 10;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private apiService: ApiService, private fb: FormBuilder, injector: Injector,private messageService: MessageService, private confirmationService: ConfirmationService, private coreService: CoreService) {
    super(injector);
  }
  dscb: dscanbo[];
  getdscanbo(): void {
    this.apiService.getdscanbo().subscribe((update) => {
      this.dscb = update;
    });
  }
  openNew() {
    this.dscanbos = {};
    this.submitted = false;
    this.productDialog = true;
}
deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.dscanbos = this.dscanbos.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}
  showAdd() {
    this.isCreate=true;
    this.hiddenID = 0;
    this.doneSetupForm = {};
    this.lgModal.show();
  }
  ngOnInit(): void {
    this.getdscanbo();

    this.formsearch = this.fb.group({
      'maCbgv': ['']
    });
    this.search();

    this.coreService.getCustomersLargeGV().then(customers => this.dscanbos = customers);
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
        return this.dscanbos ? this.first === (this.dscanbos.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.dscanbos ? this.first === 0 : true;
    }

  loadPage(page) {
    this._api.post('/api/CanBoGiangViens/searchgiaovien/', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
      this.dscanbos = res.data;
      this.totalRecords = res.totalItems;
      this.pageSize = res.pageSize;
    });
  }
  search() {
    this._api.get('/api/CanBoGiangViens/searchgiaovien').takeUntil(this.unsubscribe).subscribe(res => {
      this.dscanbos = res;
    });
  }

  get f() { return this.formdata.controls; }

  showEdit(id :any ){
    this.isCreate=false;
    this.hiddenID = 1;
    this.apiService.getbyid(id).subscribe(res=>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  save(val: dscanbo) {
  console.log(val);
    if (this.hiddenID == 0) {

      this.apiService.postcanbo(val).subscribe(res => {
        alert("Them thanh cong!");
        this.lgModal.hide();
        this.getdscanbo();
      });
    }
    else{
      this.apiService.updatecanbo(val.maCbgv, val).subscribe(res =>{
        alert("Sửa thành công");
        this.lgModal.hide();
        this.getdscanbo();
      });
    }
  }
  ChiTiet(id :any ){
    this.isCreate = true;
    this.apiService.getbyid(id).subscribe(res=>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id :any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.apiService.deletecanbo(id).subscribe(res=>{
        alert("Xóa thành công");
        this.getdscanbo();
      });
    }

  }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          nguoiTao: value.nguoiTao,
          ngayTao: +value.ngayTao,
          kinhNghiem: value.kinhNghiem,
          maCbgv: value.maCbgv,
          maPk: value.maPk,
          maBmtt: value.maBmtt,
          maNgach: +value.maNgach,
          maBac: +value.maBac,
          maTdhv: +value.maTdhv,
          maKtkl: +value.maKtkl,
          hoVaTen: value.hoVaTen,
          ngaySinh: +value.ngaySinh,
          gioiTinh: +value.gioiTinh,
          matKhau: value.matKhau,
          email: value.email,
          soTaiKhoan: value.soTaiKhoan,
          dienThoai: value.dienThoai,
          chucDanh: value.chucDanh,
          status: +value.status,
          quyen: +value.quyen,
          queQuan: value.queQuan,
          danToc: value.danToc,
          tonGiao: value.tonGiao,
          trinhDo: value.trinhDo,
        };
        this._api.post('/api/TblCanBoGiangViens/createGV', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.lgModal.hide();
        });
      });
    }
  }

  Reset() {
    // this.dscanbo = null;
    this.formdata = this.fb.group({

      'nguoiTao': [''],
      'ngayTao': [this.today, Validators.required],
      'kinhNghiem': [''],
      'maCbgv': [''],
      'maPk': [''],
      'maBmtt': [''],
      'maNgach': [''],
      'maBac': [''],
      'maTdhv': [''],
      'maKtkl': [''],
      'hoVaTen': [''],
      'ngaySinh': [''],
      'gioiTinh': [''],
      'matKhau': [''],
      'email': [''],
      'soTaiKhoan': [''],
      'dienThoai': [''],
      'chucDanh': [''],
      'status': [''],
      'quyen': [''],
      'queQuan': [''],
      'danToc': [''],
      'tonGiao': [''],
      'trinhDo': [''],
    });
  }

  createModal() {
    debugger
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    // this.dscanbo = null;
    setTimeout(() => {
      $('#createGiaoVienModal').modal('toggle');
      this.formdata = this.fb.group({
        'nguoiTao': [''],
        'ngayTao': [this.today, Validators.required],
        'kinhNghiem': [''],
        'maCbgv': [''],
        'maPk': [''],
        'maBmtt': [''],
        'maNgach': [''],
        'maBac': [''],
        'maTdhv': [''],
        'maKtkl': [''],
        'hoVaTen': [''],
        'ngaySinh': [''],
        'gioiTinh': [''],
        'matKhau': [''],
        'email': [''],
        'soTaiKhoan': [''],
        'dienThoai': [''],
        'chucDanh': [''],
        'status': [''],
        'quyen': [''],
        'queQuan': [''],
        'danToc': [''],
        'tonGiao': [''],
        'trinhDo': [''],
      });
      this.formdata.get('ngayTao').setValue(this.today);
      this.formdata.get('gioiTinh').setValue(this.genders[0].value);
      this.formdata.get('status').setValue(this.status[0].value);
      this.doneSetupForm = true;
    });
  }

    public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createGiaoVienModal').modal('toggle');
      this._api.get('/api/TblCanBoGiangViens/get-by-id/' + row.maCbgv).takeUntil(this.unsubscribe).subscribe((res: any) => {
        // this.dscanbo = res;
        // let ngayTao = new Date(this.dscanbo.ngayTao);
        // let ngaySinh = new Date(this.dscanbo.ngaySinh);
        this.formdata = this.fb.group({
          'nguoiTao': ['NguoiTao'],
          // 'ngayTao':      [ngayTao, Validators.required],
          // 'kinhNghiem':   ['this.dscanbo.kinhNghiem'],
          // 'maCbgv' :      ['this.dscanbo.maCbgv'],
          // 'maPk'  :       ['this.dscanbo.maPk'],
          // 'maBmtt'   :    ['this.dscanbo.maBmtt'],
          // 'maNgach'   :   ['this.dscanbo.maNgach'],
          // 'maBac'   :     ['this.dscanbo.maBac'],
          // 'maTdhv'   :    ['this.dscanbo.maTdhv'],
          // 'maKtkl'   :    ['this.dscanbo.maKtkl'],
          // 'hoVaTen' :     ['this.dscanbo.hoVaTen'],
          // 'ngaySinh' :    [ngaySinh, Validators.required],
          // 'gioiTinh' :    ['this.dscanbo.gioiTinh'],
          // 'matKhau' :     ['this.dscanbo.matKhau'],
          // 'email':        ['this.dscanbo.email'],
          // 'soTaiKhoan' :  ['this.dscanbo.soTaiKhoan'],
          // 'dienThoai':    ['this.dscanbo.dienThoai'],
          // 'chucDanh':     ['this.dscanbo.chucDanh'],
          // 'status':       ['this.dscanbo.status'],
          // 'quyen':        ['this.dscanbo.quyen'],
          // 'queQuan':      ['this.dscanbo.queQuan'],
          // 'danToc':       ['this.dscanbo.danToc'],
          // 'tonGiao':      ['this.dscanbo.tonGiao'],
          // 'trinhDo':      ['this.dscanbo.trinhDo'],
        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal() {
    $('#createGiaoVienModal').closest('.modal').modal('hide');
  }
}
