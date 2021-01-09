import { BaseComponent } from './../../../lib/base-component';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { FormControl, FormGroup} from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { DatePipe } from '@angular/common';
import { CoreService } from './../../../lib/core.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/lib/api.service';
import 'rxjs/add/operator/takeUntil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { dsbacluong, dscanbo, dsphongkhoa, dsbomon, khenthuong, trinhdo} from '../../../model/danhsach';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { jsPDF} from 'jspdf';
import { autoTable} from 'jspdf-autotable';


declare var $: any;
@Component({
  selector: 'app-hocvan',
  templateUrl: './hocvan.component.html',
  styleUrls: ['./hocvan.component.css']
})
export class HocvanComponent extends BaseComponent implements OnInit  {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public trinhdos: any;
  public totalRecords: any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  public hiddenID: number;
  selectedProducts: trinhdo[];
  statuses: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  submitted = false;
  first = 0;
  rows = 5;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  @ViewChild('htmlData') htmlData:ElementRef;

  constructor(private fb: FormBuilder, injector: Injector, private messageService: MessageService, private confirmationService: ConfirmationService, private coreService: CoreService) {
    super(injector);
  }
  trinhdo: trinhdo[];
  cols: any[];
  exportColumns: any[];

  getdsHV() {
    this.coreService.getdsHV().subscribe((update) => {
    this.trinhdo = update;
    console.log(this.trinhdo);
    });
  }
showAdd() {
  this.isCreate= true;
  this.hiddenID = 0;
  this.doneSetupForm = {};
  this.lgModal.show();
  }
  ngOnInit(): void {
    this.getdsHV();
    this.coreService.getCustomersLargeHV().then(customers => {
      this.trinhdo = customers;
      this.loading = false;

      this.trinhdo.forEach(
        trinhdo => (trinhdo.namTotNghiêp = new Date(trinhdo.namTotNghiêp)),
        trinhdo => (trinhdo.tenHocVan = new (trinhdo.tenHocVan))
      );
    });

    this.formsearch = this.fb.group({
      'donViCt': [''],
      'tenHocVan': [''],
      'maTdhv': [''],
      'chungChi': [''],
      'tdngoaiNgu': [''],
      'chuyenNganhDaoTao': [''],

    });
    this.search();
    this.coreService.getCustomersLargeHV().then(customers => this.trinhdos = customers);
    this.search();
    this.coreService.getCustomersSmallHV().then(data => this.trinhdo = data);
    this.cols = [
        { field: 'tenHocVan', header: 'TRINH DO' },
        { field: 'chungChi', header: 'CHUNG CHI' },
        { field: 'chuyenNganhDaoTao', header: 'CHUYEN NGANH' },
        { field: 'donViCt', header: 'DON VI' },
        { field: 'tdngoaiNgu', header: 'NGOAI NGU' },
        { field: 'status', header: 'TRANG THAI' }
    ];
    this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
    }
    exportPdf(){
    }

    exportExcel(){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.trinhdo);
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
        return this.trinhdos ? this.first === (this.trinhdos.length - this.rows): true;
    }
    isFirstPage(): boolean {
        return this.trinhdos ? this.first === 0 : true;
    }
    loadPage(page) {
      this._core.post('/api/TrinhDoHocVans', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
        this.trinhdos = res.data;
        this.totalRecords = res.totalItems;
        this.pageSize = res.pageSize;
      });
    }
    search() {
      this._core.get('/api/TrinhDoHocVans').takeUntil(this.unsubscribe).subscribe(res => {
        this.trinhdos = res;
      });
    }
    get f() { return this.formdata.controls; }
    showEdit(id: any){
      this.isCreate = false;
      this.hiddenID = 1;
      this.coreService.getbyidHV(id).subscribe(res =>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    save(val: trinhdo) {
      console.log(val);
      if (this.hiddenID == 0) {
          this.coreService.postHV(val).subscribe(res => {
          alert(" Thêm thành công!");
          this.lgModal.hide();
          this.getdsHV();
        });
      }
      else{
        this.coreService.updateHV(this.doneSetupForm.maTdhv, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdsHV();
        });
      }
    }

  ChiTiet(id: any ){
    this.isCreate = true;
    this.coreService.getbyidHV(id).subscribe(res =>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id: any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.coreService.deleteHV(id).subscribe(res =>{
        alert("Xóa thành công");
        this.getdsHV();
      });
    }
  }
  Reset(){
    this.doneSetupForm ={};
  }

}
