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
import { dsbacluong, dscanbo, dsphongkhoa, dsbomon, khenthuong, trinhdo, dangkilich} from '../../../model/danhsach';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { jsPDF} from 'jspdf';
import { autoTable} from 'jspdf-autotable';
declare var $: any;

@Component({
  selector: 'app-dangkigd',
  templateUrl: './dangkigd.component.html',
  styleUrls: ['./dangkigd.component.css']
})
export class DangkigdComponent extends BaseComponent implements OnInit  {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dangkilichs: any;
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
  selectedProducts: dangkilich[];
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
  dangkilich: dangkilich[];
  cols: any[];
  exportColumns: any[];

  getdsGD() {
    this.coreService.getdsGD().subscribe((update) => {
    this.dangkilich = update;
    console.log(this.dangkilich);
    });
  }
  showAdd() {
    this.isCreate= true;
    this.hiddenID = 0;
    this.doneSetupForm = {};
    this.lgModal.show();
    }

  ngOnInit(): void {
    this.getdsGD();
    this.coreService.getCustomersLargeLD().then(customers => {
      this.dangkilich = customers;
      this.loading = false;

      this.dangkilich.forEach(
        dangkilich => (dangkilich.ngayDk = new Date(dangkilich.ngayDk)),
        dangkilich => (dangkilich.ghichu = new (dangkilich.ghichu))
      );
    });

    this.formsearch = this.fb.group({
      'maCbgv': [''],
      'maHp': [''],
      'ngayDk': [''],
      'ghiChu': [''],
    });
    this.search();
    this.coreService.getCustomersLargeLD().then(customers => this.dangkilichs = customers);
    this.search();
    this.coreService.getCustomersSmallLD().then(data => this.dangkilich = data);
    this.cols = [
        { field: 'maCbgv', header: 'Tên GV' },
        { field: 'maHp', header: 'Học phần' },
        { field: 'ngayDk', header: 'Ngày đăng kí' },
        { field: 'ghiChu', header: 'Ghi chú' },
        { field: 'status', header: 'Trạng thái' }
    ];
    this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
    }
    exportPdf(){
    }
    exportExcel(){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.dangkilich);
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
          return this.dangkilichs ? this.first === (this.dangkilichs.length - this.rows): true;
      }
      isFirstPage(): boolean {
          return this.dangkilichs ? this.first === 0 : true;
      }

      loadPage(page) {
        this._core.post('/api/DkgiangDays', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
          this.dangkilichs = res.data;
          this.totalRecords = res.totalItems;
          this.pageSize = res.pageSize;
        });
      }
      search() {
        this._core.get('/api/DkgiangDays').takeUntil(this.unsubscribe).subscribe(res => {
          this.dangkilichs = res;
        });
      }

    get f() { return this.formdata.controls; }

    showEdit(id: any){
      this.isCreate = false;
      this.hiddenID = 1;
      this.coreService.getbyidGD(id).subscribe(res =>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    save(val: dangkilich) {
      console.log(val);
      if (this.hiddenID == 0) {
          this.coreService.postGD(val).subscribe(res => {
          alert(" Thêm thành công!");
          this.lgModal.hide();
          this.getdsGD();
        });
      }
      else{
        this.coreService.updateGD(this.doneSetupForm.maDkgd, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdsGD();
        });
      }
    }

  ChiTiet(id: any ){
    this.isCreate = true;
    this.coreService.getbyidGD(id).subscribe(res =>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id: any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.coreService.deleteGD(id).subscribe(res =>{
        alert("Xóa thành công");
        this.getdsGD();
      });
    }
  }
  Reset(){
    this.doneSetupForm ={};
  }
}
