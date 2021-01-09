import { dsphongkhoa } from './../../../model/danhsach';
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { ApiService} from 'src/app/lib/api.service';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CoreService } from './../../../lib/core.service';
import { ConfirmationService } from 'primeng/api';
import { dsbacluong, dscanbo, dsbomon, khenthuong} from '../../../model/danhsach';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { FormControl, FormGroup} from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { DatePipe } from '@angular/common';
import { jsPDF} from 'jspdf';
import { autoTable} from 'jspdf-autotable';
import { giaoviencn } from './../../../model/danhsach';
import { TutorialService } from 'src/app/lib/tutorial.service';

declare var $: any;
@Component({
  selector: 'app-phongkhoa',
  templateUrl: './phongkhoa.component.html',
  styleUrls: ['./phongkhoa.component.css']
})
export class PhongkhoaComponent extends BaseComponent implements OnInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dsphongkhoas: any;
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
  public ListDangKi:any;
  submitted = false;
  selectedProducts: dsphongkhoa[];
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
  dsphongkhoa: dsphongkhoa[];
  cols: any[];
  exportColumns: any[];
      getdsphong(){
        this.coreService.getdsphong().subscribe((update)=>{
          this.dsphongkhoas = update;
          this.ListDangKi = this.dsphongkhoas;
          console.log(this.dsphongkhoas);
        });
      }
      showAdd() {
        this.isCreate = true;
        this.hiddenID = 0;
        this.doneSetupForm = {};
        this.lgModal.show();
      }
    ngOnInit(): void {
    this.getdsphong();

    this.coreService.getCustomersLargePB().then(customers => {
      this.dsphongkhoas = customers;
      this.loading = false;

      this.dsphongkhoa.forEach(
        dsphongkhoa => (dsphongkhoa.ngayTao = new Date(dsphongkhoa.ngayTao))
      );
    });

    this.formsearch = this.fb.group({
      'maPK': ['']
    });
    this.search();
    this.coreService.getCustomersLargePB().then(customers => this.dsphongkhoa = customers);
    this.search();
    this.coreService.getCustomersSmallPB().then(data => this.dsphongkhoas = data);

    this.cols = [
      { field: 'tenPhongKhoa', header: 'TEN KHOA' },
      { field: 'soLuongNhanSu', header: 'NHAN SU' },
      { field: 'dienThoai', header: 'SO DIEN THOAI' },
      { field: 'email', header: 'EMAIL' },
  ];

  this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
  }
  exportPdf(){

  }

  exportExcel(){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.dsphongkhoa);
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
        return this.dsphongkhoas ? this.first === (this.dsphongkhoas.length - this.rows): true;
    }
    isFirstPage(): boolean {
        return this.dsphongkhoas ? this.first === 0 : true;
    }
  loadPage(page) {
    this._core.post('/api/PhongKhoas',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.dsphongkhoas = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }
  search() {
    this._core.get('/api/PhongKhoas').takeUntil(this.unsubscribe).subscribe(res => {
      this.dsphongkhoas = res;
    });
  }

  get f() { return this.formdata.controls; }

  showEdit(id :any ){
    this.isCreate=false;
    this.hiddenID = 1;
    this.coreService.getbyidPK(id).subscribe(res=>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
    }

    save(val: dsphongkhoa) {
      console.log(val);
      if (this.hiddenID == 0) {
        this.coreService.postphong(val).subscribe(res => {
          alert("Them thanh cong!");
          this.lgModal.hide();
          this.getdsphong();
        });
      }
      else{
        this.coreService.updatePK(this.doneSetupForm.maPk, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdsphong();
        });
      }
    }
    ChiTiet(id :any ){
      this.isCreate=true;
      this.coreService.getbyidPK(id).subscribe(res=>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    Delete(id :any){
      var r = confirm("Bạn có muốn xóa không?");
      if(r==true){
        this.coreService.deletePK(id).subscribe(res=>{
          alert("Xóa thành công");
          this.getdsphong();
        });
      }
    }
  Reset() {
    this.doneSetupForm ={};
  }
}
