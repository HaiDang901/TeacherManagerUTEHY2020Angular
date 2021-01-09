import { giaoviencn } from './../../../model/danhsach';
import { CoreService } from './../../../lib/core.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild , ElementRef} from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { ApiService } from 'src/app/lib/api.service';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TutorialService } from 'src/app/lib/tutorial.service';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { FormControl, FormGroup} from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { DatePipe } from '@angular/common';
import { dsbacluong, dscanbo, dsphongkhoa, dsbomon, khenthuong} from '../../../model/danhsach';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { jsPDF} from 'jspdf';
import { autoTable} from 'jspdf-autotable';
declare var $: any;

@Component({
  selector: 'app-chunhiem',
  templateUrl: './chunhiem.component.html',
  styleUrls: ['./chunhiem.component.css']
})
export class ChunhiemComponent extends BaseComponent implements OnInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public giaoviencns: any;
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
  public hoVaTen: any;
  public ListDangKi:any;
  submitted = false;
  selectedProducts: giaoviencn[];
  statuses: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
// ----------------------------//
  first = 0;
  rows = 5;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  @ViewChild('htmlData') htmlData:ElementRef;
  constructor(private fb: FormBuilder, injector: Injector, private messageService: MessageService, private confirmationService: ConfirmationService, private coreService: CoreService) {
        super(injector);
      }
  giaoviencn: giaoviencn[];
  cols: any[];
  exportColumns: any[];

  getdscanbo1() {
    this._api.get('/api/GiaoVienChuNhiems').subscribe(res=> {
      this.dscanbo = res;
      console.log(res);
    });
  }
  getdsCN(){
    this.coreService.getdsCN().subscribe((update)=>{
      this.giaoviencn = update;
      this.ListDangKi = this.giaoviencn;
      console.log(this.giaoviencn);
    });
  }

  ChangePK(val)
  {
    this.ListDangKi=this.giaoviencn.filter(s=> s.maCbgv==val);
  }
  showAdd() {
    this.isCreate = true;
    this.hiddenID = 0;
    this.doneSetupForm = {};
    this.lgModal.show();
  }

  ngOnInit(): void {

    this.getdscanbo1();
    this.getdsCN();
      this.coreService.getCustomersLargeCN().then(customers => {
        this.giaoviencn = customers;
        this.loading = false;

        this.giaoviencn.forEach(
          giaoviencn => (giaoviencn.ngayTao = new Date(giaoviencn.ngayTao))
        );
        this.giaoviencn.forEach(
          giaoviencn => (giaoviencn.batDau = new Date(giaoviencn.batDau))
        );
        this.giaoviencn.forEach(
          giaoviencn => (giaoviencn.ketThuc = new Date(giaoviencn.ketThuc))
        );
      });

      this.formsearch = this.fb.group({

        'hoVaTen': ['']
      });
      this.search();
      this.coreService.getCustomersLargeCN().then(customers => this.giaoviencn = customers);
      this.search();
      this.coreService.getCustomersSmallCN().then(data => this.giaoviencn = data);

      this.cols = [
          { field: 'maLop', header: 'LOP ' },
          { field: 'hoVaTen', header: 'TEN GIAO VIEN' },
          { field: 'batDau', header: 'BAT DAU' },
          {  field: 'hieuLuc', header: 'HIEU LUC' },
      ];
      this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
    }
    exportPdf(){

    }

    exportExcel(){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.giaoviencn);
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
          return this.giaoviencns ? this.first === (this.giaoviencns.length - this.rows): true;
      }

      isFirstPage(): boolean {
          return this.giaoviencns ? this.first === 0 : true;
      }
    loadPage(page) {
      this._core.post('/api/GiaoVienChuNhiems',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
        this.giaoviencns = res.data;
        this.totalRecords =  res.totalItems;
        this.pageSize = res.pageSize;
        });
    }
    search() {
        this._core.get('/api/GiaoVienChuNhiems').takeUntil(this.unsubscribe).subscribe(res => {
          this.giaoviencns = res;
        });
    }
    get f() { return this.formdata.controls; }

    showEdit(id :any ){
      this.isCreate=false;
      this.hiddenID = 1;
      this.coreService.getbyidCN(id).subscribe(res=>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    save(val: giaoviencn) {
      console.log(val);
      if (this.hiddenID == 0) {
        this.coreService.postCN(val).subscribe(res => {
          alert("Them thanh cong!");
          this.lgModal.hide();
          this.getdsCN();
        });
      }
      else{
        this.coreService.updateCN(this.doneSetupForm.maGvcn, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdsCN();
        });
      }
    }
    ChiTiet(id :any ){
      this.isCreate=true;
      this.coreService.getbyidCN(id).subscribe(res=>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    Delete(id :any){
      var r = confirm("Bạn có muốn xóa không?");
      if(r==true){
        this.coreService.deleteCN(id).subscribe(res=>{
          alert("Xóa thành công");
          this.getdsCN();
        });
      }

    }
    Reset(){
      this.doneSetupForm ={};
    }

  }
