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
  selector: 'app-bomon',
  templateUrl: './bomon.component.html',
  styleUrls: ['./bomon.component.css']
})
export class BomonComponent extends BaseComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dsbomons: any;
  public dsphongkhoas: any;
  public dsphongkhoa: any;

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
  public tenPhongKhoa: any;
  public ListBoMon:any;
  submitted = false;
  selectedProducts: dsbomon[];
  statuses: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  selectedState: any = null;
  active : any;
// ----------------------------//
  first = 0;
  rows = 5;


  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  @ViewChild('htmlData') htmlData:ElementRef;
  constructor(private fb: FormBuilder, injector: Injector, private messageService: MessageService, private confirmationService: ConfirmationService, private coreService: CoreService) {
    super(injector);
  }

   dsbomon: dsbomon[];
  //  dsphongkhoa : dsphongkhoa[];
   cols: any[];
   exportColumns: any[];

   getdsphong(){
    // this.coreService.getdsphong().subscribe((update)=>{
    //   this.dsphongkhoas = update;
    //   console.log(update);
    // });
    this._api.get('/api/PhongKhoas').subscribe(res=>
      {
        this.dsphongkhoa = res;
        console.log(res);
      });
  }

    getdsbomon(){
      this.coreService.getdsbomon().subscribe((update)=>{
        this.dsbomon = update;
        this.ListBoMon=this.dsbomon;
        console.log(this.dsbomon);

      });
    }
    showAdd() {
      this.isCreate = true;
      this.hiddenID = 0;
      this.doneSetupForm = {};
      this.lgModal.show();
    }
    ngOnInit(): void {

      this.getdsbomon();
      this.getdsphong();

      this.coreService.getCustomersLarge().then(customers => {
        this.dsbomon = customers;
        this.loading = false;

        this.dsbomon.forEach(
          dsbomon => (dsbomon.ngayTao = new Date(dsbomon.ngayTao))
        );
      });

      this.formsearch = this.fb.group({
        'maBmtt': [''],
        'maPk':[''],
        'tenPhongKhoa': [''],
        'tenBmtt': ['']
      });
      this.search();
      this.coreService.getCustomersLarge().then(customers => this.dsbomons = customers);
      this.search();
      this.coreService.getCustomersSmall().then(data => this.dsbomon = data);

      this.cols = [
          { field: 'tenPhongKhoa', header: 'TEN PHONG KHOA ' },
          { field: 'tenBmtt', header: 'TEN BO MON ' },
          { field: 'diaChi', header: 'DIA CHI ' },
          { field: 'soLuongNhanSu', header: 'SL NHAN SU' },
      ];
      this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
    }
    exportPdf(){

    }

    exportExcel(){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.dsbomon);
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
          return this.dsbomons ? this.first === (this.dsbomons.length - this.rows): true;
      }

      isFirstPage(): boolean {
          return this.dsbomons ? this.first === 0 : true;
      }
    loadPage(page) {
      this._core.post('/api/BoMonTrungTams',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
        this.dsbomons = res.data;
        this.totalRecords =  res.totalItems;
        this.pageSize = res.pageSize;
        });
    }

    search() {
        this._core.get('/api/BoMonTrungTams').takeUntil(this.unsubscribe).subscribe(res => {
          this.dsbomons = res;
        });
    }
    get f() { return this.formdata.controls; }

    showEdit(id :any ){
      this.isCreate=false;
      this.hiddenID = 1;
      this.coreService.getbyidBM(id).subscribe(res=>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    save(val: dsbomon) {
      console.log(val);
      if (this.hiddenID == 0) {
        this.coreService.postbomon(val).subscribe(res => {
          alert("Thêm thành công!");
          this.lgModal.hide();
          this.getdsbomon();
        });
      }
      else{
        this.coreService.updatebomon(this.doneSetupForm.maBmtt, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdsbomon();
        });
      }
    }
    ChiTiet(id :any ){
      this.isCreate=true;
      this.coreService.getbyidBM(id).subscribe(res=>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    Delete(id :any){
      var r = confirm("Bạn có muốn xóa không?");
      if(r==true){
        this.coreService.deleteBM(id).subscribe(res=>{
          alert("Xóa thành công");
          this.getdsbomon();
        });
      }

    }
    Reset(){
      this.doneSetupForm ={};
    }
    ChangePK(val)
    {
      this.ListBoMon=this.dsbomon.filter(s=> s.maPk==val);
    }
}
