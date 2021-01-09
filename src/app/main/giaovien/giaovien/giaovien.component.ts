import { CoreService } from './../../../lib/core.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/lib/api.service';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { dscanbo, dsphongkhoa, dsbomon} from '../../../model/danhsach';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { FormControl, FormGroup} from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { DatePipe } from '@angular/common';
import { dsbacluong, khenthuong, trinhdo, dangkilich} from '../../../model/danhsach';
import { jsPDF} from 'jspdf';
import { autoTable} from 'jspdf-autotable';

declare var $: any;
@Component({
  selector: 'app-giaovien',
  templateUrl: './giaovien.component.html',
  styleUrls: ['./giaovien.component.css']
})
export class GiaovienComponent extends BaseComponent implements OnInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dscanbos: any;
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
  statuses: any[];
  // loading: boolean = true;
  activityValues: number[] = [0, 100];
  submitted = false;
  first = 0;
  rows = 10;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  @ViewChild('htmlData') htmlData:ElementRef;
  constructor(private apiService: ApiService,
    private fb: FormBuilder,
    injector: Injector,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private coreService: CoreService) {
    super(injector);
  }
  dscanbo: dscanbo[];
  cols: any[];
  exportColumns: any[];

  // getdscanbo1(): void {
  //   this.coreService.getdscanbo1().subscribe((update) => {
  //     this.dscanbo = update;
  //     console.log(this.dscanbo);
  //   });
  // }
  getdscanbo1() {
    this._api.get('/api/CanBoGiangViens').subscribe(res=> {
      this.dscanbos = res;
      console.log(res);
    });
  }

  showAdd() {
    this.isCreate=true;
    this.hiddenID = 0;
    this.doneSetupForm = {};
    this.lgModal.show();
  }
  ngOnInit(): void {
    this.getdscanbo1();
      this.coreService.getCustomersLargeGV().then(customers => {
        this.dscanbo = customers;
        // this.loading = false;
        // this.dscanbo.forEach(
        //   dscanbo => (dscanbo.ngaySinh = new Date(dscanbo.ngaySinh)),
        //   dscanbo => (dscanbo.ngayCap = new Date(dscanbo.ngayCap)),
        // );
      });
      this.formsearch = this.fb.group({
        'maCbgv': [''],
        'maPK': [''],
        'maBMTT': [''],
        'hoVaTen': [''],
        'gioiTinh': [''],
        'email': [''],
        'dienThoai': [''],
        'queQuan': [''],
        'tonGiao': [''],
        'trinhDo': [''],
      });
    this.search();
    this.coreService.getCustomersLargeGV().then(customers => this.dscanbos = customers);
    this.search();

    this.coreService.getCustomersSmallGV().then(data => this.dscanbo = data);
    this.cols = [
        { field: 'maCbgv', header: 'MA CAN BO GV' },
        { field: 'maPK', header: 'MA PHONG KHOA' },
        { field: 'maBMTT', header: 'MA BO MON' },
        { field: 'hoVaTen', header: 'HO TEN' },
        { field: 'gioiTinh', header: 'GIOI TINH' },
        { field: 'dienThoai', header: 'DIEN THOAI' },
        { field: 'email', header: 'EMAIL' },
        { field: 'queQuan', header: 'QUE QUAN' },
        { field: 'matKhau', header: 'MAT KHAU' },
        { field: 'tonGiao', header: 'TON GIAO' },
        { field: 'trinhDo', header: 'TRINH DO' },
    ];

    this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
    }
    exportPdf(){
    }
    exportExcel(){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.dscanbo);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
      });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
      import("file-saver").then(FileSaver => {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      });
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
    this._core.post('/api/CanBoGiangViens', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
      this.dscanbos = res.data;
      this.totalRecords = res.totalItems;
      this.pageSize = res.pageSize;
    });
  }
  search() {
    this._core.get('/api/CanBoGiangViens').takeUntil(this.unsubscribe).subscribe(res => {
      this.dscanbos = res;
    });
  }

  get f() { return this.formdata.controls; }

  showEdit(id :any ){
    this.isCreate=false;
    this.hiddenID = 1;
    this.coreService.getbyid1(id).subscribe(res=>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  save(val: dscanbo) {
  console.log(val);
    if (this.hiddenID == 0) {
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;

        this.coreService.postcanbo1(val).subscribe(res => {
          alert("Them thanh cong!");
          this.lgModal.hide();
          this.getdscanbo1();
        });
      });
    }
    else{
      // this.coreService.updatecanbo(val.maCbgv, val).subscribe(res =>{
        this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
          let data_image = data == '' ? null : data;
          this.coreService.updatecanbo1(this.doneSetupForm.maCbgv, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdscanbo1();
        });
      });
    }
  }
  ChiTiet(id :any ){
    this.isCreate = true;
    this.coreService.getbyid1(id).subscribe(res=>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id :any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.coreService.deletecanbo1(id).subscribe(res=>{
        alert("Xóa thành công");
        this.getdscanbo1();
      });
    }

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
  //       this._core.post('/api/TblCanBoGiangViens', tmp).takeUntil(this.unsubscribe).subscribe(res => {
  //         alert('Thêm thành công');
  //         this.search();
  //         this.lgModal.hide();
  //       });
  //     });
  //   }
  // }

  Reset() {
    this.doneSetupForm ={};
    // this.dscanbo = null;
    // this.formdata = this.fb.group({

    //   'nguoiTao': [''],
    //   'ngayTao': [this.today, Validators.required],
    //   'kinhNghiem': [''],
    //   'maCbgv': [''],
    //   'maPk': [''],
    //   'maBmtt': [''],
    //   'maNgach': [''],
    //   'maBac': [''],
    //   'maTdhv': [''],
    //   'maKtkl': [''],
    //   'hoVaTen': [''],
    //   'ngaySinh': [''],
    //   'gioiTinh': [''],
    //   'matKhau': [''],
    //   'email': [''],
    //   'soTaiKhoan': [''],
    //   'dienThoai': [''],
    //   'chucDanh': [''],
    //   'status': [''],
    //   'quyen': [''],
    //   'queQuan': [''],
    //   'danToc': [''],
    //   'tonGiao': [''],
    //   'trinhDo': [''],
    // });
  }

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

  //   public openUpdateModal(row) {
  //   this.doneSetupForm = false;
  //   this.showUpdateModal = true;
  //   this.isCreate = false;
  //   setTimeout(() => {
  //     $('#createGiaoVienModal').modal('toggle');
  //     this._core.get('/api/TblCanBoGiangViens/get-by-id/' + row.maCbgv).takeUntil(this.unsubscribe).subscribe((res: any) => {
  //       // this.dscanbo = res;
  //       // let ngayTao = new Date(this.dscanbo.ngayTao);
  //       // let ngaySinh = new Date(this.dscanbo.ngaySinh);
  //       this.formdata = this.fb.group({
  //         'nguoiTao': ['NguoiTao'],
  //       });
  //       this.doneSetupForm = true;
  //     });
  //   }, 700);
  // }

  // closeModal() {
  //   $('#createGiaoVienModal').closest('.modal').modal('hide');
  // }
}
