import { lylich } from './../../../model/danhsach';
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
  selector: 'app-lylichgv',
  templateUrl: './lylichgv.component.html',
  styleUrls: ['./lylichgv.component.css']
})
export class LylichgvComponent extends BaseComponent implements OnInit{
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public lylichs: any;
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
  public Listlylich:any;
  submitted = false;
  selectedProducts: lylich[];
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
  lylich: lylich[];
  cols: any[];
  exportColumns: any[];

  getdscanbo1(){
    this.coreService.getdscanbo1().subscribe((update)=>{
      this.dscanbo = update;
      console.log(update);
    });
  }
  getdsLL() {
    this.coreService.getdsLL().subscribe((update) => {
    this.lylich = update;
    this.Listlylich=this.lylich;
    console.log(this.lylich);
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
    this.getdsLL();
    this.coreService.getCustomersLargeLL().then(customers => {
      this.lylich = customers;
      this.loading = false;
    });

    this.formsearch = this.fb.group({
      'maHd': [''],
      'maCbgv': [''],
      'maLL': [''],
      'tenLl': [''],
      'loaiLl': [''],
      'linkBaiBao': ['']
    });
    this.search();
    this.coreService.getCustomersLargeLL().then(customers => this.lylichs = customers);
    this.search();

    this.coreService.getCustomersSmallLL().then(data => this.lylich = data);

    this.cols = [
        { field: 'maCbgv', header: 'GIAO VIEN' },
        { field: 'tenLl', header: 'LY LICH' },
        { field: 'loaiLl', header: 'LOAI LY LICH' },
        { field: 'linkBaiBao', header: 'LINK' },
        { field: 'status', header: 'TRANG THAI' }
    ];

    this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
  }
  exportPdf(){

  }

  exportExcel(){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.lylich);
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
        return this.lylichs ? this.first === (this.lylichs.length - this.rows): true;
    }
    isFirstPage(): boolean {
        return this.lylichs ? this.first === 0 : true;
    }

    loadPage(page) {
      this._core.post('/api/LyLichGvs', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
        this.lylichs = res.data;
        this.totalRecords = res.totalItems;
        this.pageSize = res.pageSize;
      });
    }
    search() {
      this._core.get('/api/LyLichGvs').takeUntil(this.unsubscribe).subscribe(res => {
        this.lylichs = res;
      });
    }
    get f() { return this.formdata.controls; }
    showEdit(id: any){
      this.isCreate = false;
      this.hiddenID = 1;
      this.coreService.getbyidLL(id).subscribe(res =>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    save(val: lylich) {
      console.log(val);
      if (this.hiddenID == 0) {
          this.coreService.postLL(val).subscribe(res => {
          alert(" Thêm thành công!");
          this.lgModal.hide();
          this.getdsLL();
        });
      }
      else{
        this.coreService.updateLL(this.doneSetupForm.maLl, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdsLL();
        });
      }
    }

  ChiTiet(id: any ){
    this.isCreate = true;
    this.coreService.getbyidLL(id).subscribe(res =>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id: any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.coreService.deleteLL(id).subscribe(res =>{
        alert("Xóa thành công");
        this.getdsLL();
      });
    }
  }
  Reset(){
    this.doneSetupForm ={};
  }
  ChangePK(val)
    {
      this.Listlylich=this.lylich.filter(s=> s.maCbgv==val);
    }

}
