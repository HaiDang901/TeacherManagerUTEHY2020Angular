import { hopdongld } from './../../../model/danhsach';

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
import { dsbacluong, dscanbo, dsphongkhoa, dsbomon, khenthuong} from '../../../model/danhsach';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { jsPDF} from 'jspdf';
import { autoTable} from 'jspdf-autotable';

declare var $: any;
@Component({
  selector: 'app-hopdonggv',
  templateUrl: './hopdonggv.component.html',
  styleUrls: ['./hopdonggv.component.css']
})
export class HopdonggvComponent  extends BaseComponent implements OnInit{
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public hopdonglds: any;
  public dscanbo: any;
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
  public hiddenID: number;
  public hoVaTen: any ;
  public Listhopdong:any;
  submitted = false;
  selectedProducts: hopdongld[];
  statuses: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  active : any;

  first = 0;
  rows = 5;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;

  @ViewChild('htmlData') htmlData:ElementRef;
  constructor(private fb: FormBuilder, injector: Injector, private messageService: MessageService, private confirmationService: ConfirmationService, private coreService: CoreService) {
    super(injector);
  }
  hopdongld: hopdongld[];
  cols: any[];
  exportColumns: any[];

  getdscanbo1(){
    this.coreService.getdscanbo1().subscribe((update)=>{
      this.dscanbo = update;
      console.log(update);
    });
  }
  getdsHD() {
    this.coreService.getdsHD().subscribe((update) => {
    this.hopdongld = update;
    this.Listhopdong=this.hopdongld;
    console.log(this.hopdongld);
    });
  }
  showAdd() {
  this.isCreate= true;
  this.hiddenID = 0;
  this.doneSetupForm = {};
  this.lgModal.show();
  }

  ngOnInit(): void {
    this.getdscanbo1();
      this.getdsHD();
      this.coreService.getCustomersLargeHD().then(customers => {
        this.hopdongld = customers;
        this.loading = false;

        this.hopdongld.forEach(
          hopdongld => (hopdongld.tuNgay = new Date(hopdongld.tuNgay))
        );
        this.hopdongld.forEach(
          hopdongld => (hopdongld.denNgay = new Date(hopdongld.denNgay))
        );
      });

      this.formsearch = this.fb.group({
        'maHd': [''],
        'maCbgv': [''],
        'hoVaTen': [''],
        'loaiHd':[''],
        'tuNgay': [''],
        'denNgay': [''],
        'ghiChu': [''],
        'status': [''],

      });
      this.search();
      this.coreService.getCustomersLargeHD().then(customers => this.hopdonglds = customers);
      this.search();

      this.coreService.getCustomersSmallHD().then(data => this.hopdongld = data);

      this.cols = [
          { field: 'hoVaTen', header: 'GIAO VIEN' },
          { field: 'loaiHd', header: 'LOAI HOP DONG' },
          { field: 'tuNgay', header: 'TU NGAY' },
          { field: 'denNgay', header: 'ĐEN NGAY' },
          { field: 'status', header: 'TRANG THAI' }
      ];

      this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
    }
    exportPdf(){

    }

    exportExcel(){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.hopdongld);
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
          return this.hopdonglds ? this.first === (this.hopdonglds.length - this.rows): true;
      }
      isFirstPage(): boolean {
          return this.hopdonglds ? this.first === 0 : true;
      }

      loadPage(page) {
        this._core.post('/api/HopDongLds', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
          this.hopdonglds = res.data;
          this.totalRecords = res.totalItems;
          this.pageSize = res.pageSize;
        });
      }
      search() {
        this._core.get('/api/HopDongLds').takeUntil(this.unsubscribe).subscribe(res => {
          this.hopdonglds = res;
        });
      }
      get f() { return this.formdata.controls; }

    showEdit(id: any){
      this.isCreate = false;
      this.hiddenID = 1;
      this.coreService.getbyidHD(id).subscribe(res =>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    save(val: hopdongld) {
      console.log(val);
      if (this.hiddenID == 0) {
          this.coreService.postHD(val).subscribe(res => {
          alert(" Thêm thành công!");
          this.lgModal.hide();
          this.getdsHD();
        });
      }
      else{
        this.coreService.updateHD(this.doneSetupForm.maHd, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdsHD();
        });
      }
    }

  ChiTiet(id: any ){
    this.isCreate = true;
    this.coreService.getbyidHD(id).subscribe(res =>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id: any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.coreService.deleteHD(id).subscribe(res =>{
        alert("Xóa thành công");
        this.getdsHD();
      });
    }
  }
  Reset(){
    this.doneSetupForm ={};
  }
  ChangePK(val)
  {
    this.Listhopdong=this.hopdongld.filter(s=> s.maCbgv==val);
  }

}
