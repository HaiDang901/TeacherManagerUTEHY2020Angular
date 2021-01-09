import { dsluong } from './../../../model/danhsach';
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { dscanbo, dsphongkhoa, dsbomon} from '../../../model/danhsach';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { FormControl, FormGroup} from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { DatePipe } from '@angular/common';
import { CoreService } from './../../../lib/core.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { jsPDF} from 'jspdf';
import { autoTable} from 'jspdf-autotable';
declare var $: any;

@Component({
  selector: 'app-luong',
  templateUrl: './luong.component.html',
  styleUrls: ['./luong.component.css']
})
export class LuongComponent extends BaseComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dsluongs: any;
  public dsbacluong: any;
  public dsbacluongs: any;
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
  public tenBac: any;
  public ListDangKi:any;
  submitted = false;
  selectedProducts: dsluong[];
  statuses: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  first = 0;
  rows = 5;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  @ViewChild('htmlData') htmlData:ElementRef;
  constructor(private fb: FormBuilder, injector: Injector, private messageService: MessageService, private confirmationService: ConfirmationService, private coreService: CoreService) {
    super(injector);
  }
  dsluong: dsluong[];
  cols: any[];
  exportColumns: any[];

  getdsBL() {
    this._api.get('/api/Luongs').subscribe(res=> {
      this.dsbacluong = res;
      console.log(res);
    });
  }
  getdsL() {
    this.coreService.getdsL().subscribe((update) => {
    this.dsluong = update;
    this.ListDangKi=this.dsluong;
    console.log(this.dsluong);
    });
  }
  showAdd() {
  this.isCreate= true;
  this.hiddenID = 0;
  this.doneSetupForm = {};
  this.lgModal.show();
  }

  ngOnInit(): void {
    this.getdsL();
    this.getdsBL();
    this.coreService.getCustomersLargeL().then(customers => {
      this.dsluong = customers;
      this.loading = false;
    });

    this.formsearch = this.fb.group({
      'maLuong': [''],
      'maBac': [''],
      'tenBac': [''],
      'mucLuong': [''],
      'luongCb': [''] ,
      'luongPc': [''],
    });
    this.search();
    this.coreService.getCustomersLargeL().then(customers => this.dsluongs = customers);
    this.search();

    this.coreService.getCustomersSmallL().then(data => this.dsluong = data);

    this.cols = [
        { field: 'tenBac', header: ' TEN BAC' },
        { field: 'mucLuong', header: 'LUONG' },
        { field: 'luongPc', header: 'PHU CAP' },
        { field: 'ngayNhan', header: 'NGAY NHAN' },
        // { field: '=SUM(mucLuong;luongPc)', header: 'TONG LUONG' },
        { field: 'status', header: 'TRANG THAI' }
    ];

    this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
  }
  exportPdf(){

  }

  exportExcel(){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.dsluong);
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
        return this.dsluongs ? this.first === (this.dsluongs.length - this.rows): true;
    }
    isFirstPage(): boolean {
        return this.dsluongs ? this.first === 0 : true;
    }

    loadPage(page) {
      this._core.post('/api/Luongs', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
        this.dsluongs = res.data;
        this.totalRecords = res.totalItems;
        this.pageSize = res.pageSize;
      });
    }
    search() {
      this._core.get('/api/Luongs').takeUntil(this.unsubscribe).subscribe(res => {
        this.dsluongs = res;
      });
    }
    get f() { return this.formdata.controls; }
    showEdit(id: any){
      this.isCreate = false;
      this.hiddenID = 1;
      this.coreService.getbyidL(id).subscribe(res =>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    save(val: dsluong) {
      console.log(val);
      if (this.hiddenID == 0) {
          this.coreService.postL(val).subscribe(res => {
          alert(" Thêm thành công!");
          this.lgModal.hide();
          this.getdsL();
        });
      }
      else{
        this.coreService.updateL(this.doneSetupForm.maLuong, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdsL();
        });
      }
    }

  ChiTiet(id: any ){
    this.isCreate = true;
    this.coreService.getbyidL(id).subscribe(res =>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id: any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.coreService.deleteL(id).subscribe(res =>{
        alert("Xóa thành công");
        this.getdsL();
      });
    }
  }
  Reset(){
    this.doneSetupForm ={};
  }
      ChangePK(val)
  {
      this.ListDangKi=this.dsluong.filter(s=> s.maBac==val);
  }


  // getdsluong(): void {
  //   this.apiService.getdsluong().subscribe((update) => {
  //     this.dsl = update;
  //   });
  // }
  // showAdd() {
  //   this.isCreate=true;
  //   this.hiddenID = 0;
  //   this.doneSetupForm = {};
  //   this.lgModal.show();
  // }
  // ngOnInit(): void {
  //   this.getdsluong();

  //   this.formsearch = this.fb.group({
  //     'maLuong': ['']
  //   });
  //   this.search();
  // }

  // loadPage(page) {
  //   this._api.post('/api/CanBoGiangViens/searchgiaovien/', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
  //     this.dsluongs = res.data;
  //     this.totalRecords = res.totalItems;
  //     this.pageSize = res.pageSize;
  //   });
  // }
  // search() {
  //   this._api.get('/api/CanBoGiangViens/searchgiaovien').takeUntil(this.unsubscribe).subscribe(res => {
  //     this.dsluongs = res;
  //   });
  // }

  // get f() { return this.formdata.controls; }

  // showEdit(id :any ){
  //   this.isCreate=false;
  //   this.hiddenID = 1;
  //   this.apiService.getbyidluong(id).subscribe(res=>{
  //     this.doneSetupForm = res;
  //   });
  //   this.lgModal.show();
  // }
  // save(val: dsluong) {
  // console.log(val);
  //   if (this.hiddenID == 0) {

  //     this.apiService.postluong(val).subscribe(res => {
  //       alert("Them thanh cong!");
  //       this.lgModal.hide();
  //       this.getdsluong();
  //     });
  //   }
  //   else{
  //     this.apiService.updateluong(val.maLuong, val).subscribe(res =>{
  //       alert("Sửa thành công");
  //       this.lgModal.hide();
  //       this.getdsluong();
  //     });
  //   }
  // }
  // ChiTiet(id :any ){
  //   this.isCreate = true;
  //   this.apiService.getbyidluong(id).subscribe(res=>{
  //     this.doneSetupForm = res;
  //   });
  //   this.lgModal.show();
  // }
  // Delete(id :any){
  //   var r = confirm("Bạn có muốn xóa không?");
  //   if(r==true){
  //     this.apiService.deleteluong(id).subscribe(res=>{
  //       alert("Xóa thành công");
  //       this.getdsluong();
  //     });
  //   }

  // }
  // Reset(){
  //   this.doneSetupForm ={};
  // }


}



