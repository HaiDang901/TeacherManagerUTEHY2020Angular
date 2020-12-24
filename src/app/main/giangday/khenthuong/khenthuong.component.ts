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
  selector: 'app-khenthuong',
  templateUrl: './khenthuong.component.html',
  styleUrls: ['./khenthuong.component.css']
})
export class KhenthuongComponent extends BaseComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  public khenthuongs: any;
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
  submitted = false;
  selectedProducts: khenthuong[];
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
  khenthuong: khenthuong[];
  cols: any[];
  exportColumns: any[];

  getdsKT() {
      this.coreService.getdsKT().subscribe((update) => {
      this.khenthuong = update;
      console.log(this.khenthuong);
      });
    }
  showAdd() {
    this.isCreate= true;
    this.hiddenID = 0;
    this.doneSetupForm = {};
    this.lgModal.show();
    }
    ngOnInit(): void {
      this.getdsKT();
      //   this.coreService.get("/api/KhenThuongKiLuats").takeUntil(this.unsubscribe).subscribe(res=>{
      //   this.khenthuongs = res;
      // });

      this.coreService.getCustomersLargeKT().then(customers => {
        this.khenthuong = customers;
        this.loading = false;

        this.khenthuong.forEach(
          khenthuong => (khenthuong.ngayKt = new Date(khenthuong.ngayKt))
        );
      });

      this.formsearch = this.fb.group({
        'maKtkl': ['']
      });
      this.search();
      this.coreService.getCustomersLargeKT().then(customers => this.khenthuongs = customers);
      this.search();

      this.coreService.getCustomersSmallKT().then(data => this.khenthuong = data);

      this.cols = [
          { field: 'tenKtkl', header: 'Tên' },
          { field: 'lyDo', header: 'Lý Do' },
          { field: 'ngayKt', header: 'Ngày' },
          { field: 'hinhThuc', header: 'Hình Thức' },
          { field: 'status', header: 'Trạng Thái' }
      ];

      this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
    }
    exportPdf(){

    }

    exportExcel(){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.khenthuong);
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
          return this.khenthuongs ? this.first === (this.khenthuongs.length - this.rows): true;
      }
      isFirstPage(): boolean {
          return this.khenthuongs ? this.first === 0 : true;
      }

      loadPage(page) {
        this._core.post('/api/KhenThuongKiLuats', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
          this.khenthuongs = res.data;
          this.totalRecords = res.totalItems;
          this.pageSize = res.pageSize;
        });
      }
      search() {
        this._core.get('/api/KhenThuongKiLuats').takeUntil(this.unsubscribe).subscribe(res => {
          this.khenthuongs = res;
        });
      }

    get f() { return this.formdata.controls; }

    showEdit(id: any){
      this.isCreate = false;
      this.hiddenID = 1;
      this.coreService.getbyidKT(id).subscribe(res =>{
        this.doneSetupForm = res;
      });
      this.lgModal.show();
    }
    save(val: khenthuong) {
      console.log(val);
      if (this.hiddenID == 0) {
          this.coreService.postKT(val).subscribe(res => {
          alert(" Thêm thành công!");
          this.lgModal.hide();
          this.getdsKT();
        });
      }
      else{
        this.coreService.updateKT(this.doneSetupForm.maKtkl, val).subscribe(res =>{
          alert("Sửa thành công");
          this.lgModal.hide();
          this.getdsKT();
        });
      }
    }

  ChiTiet(id: any ){
    this.isCreate = true;
    this.coreService.getbyidKT(id).subscribe(res =>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id: any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.coreService.deleteKT(id).subscribe(res =>{
        alert("Xóa thành công");
        this.getdsKT();
      });
    }
  }
  Reset(){
    this.doneSetupForm ={};
  }

























































  // onSubmit(value) {
  // }
  // createModal() {
  //   debugger
  //   this.doneSetupForm = false;
  //   this.showUpdateModal = true;
  //   this.isCreate = true;
  //   // this.dscanbo = null;
  //   setTimeout(() => {
  //     $('#createModal').modal('toggle');
  //     this.formdata = this.fb.group({
  //       'ngayKt': [this.today, Validators.required],
  //       // 'maKtkl': [''],
  //       'tenKtkl': [''],
  //       'lyDo': [''],
  //       'ghiChu': [''],
  //       'hinhThuc': [''],
  //       'status': [''],
  //     });
  //     this.formdata.get('ngayKt').setValue(this.today);
  //     this.formdata.get('status').setValue(this.status[0].value);
  //     this.doneSetupForm = true;
  //   });
  // }
  //   public openUpdateModal(row) {
  //   this.doneSetupForm = false;
  //   this.showUpdateModal = true;
  //   this.isCreate = false;
  //   setTimeout(() => {
  //     $('#createModal').modal('toggle');
  //     this._core.get('/api/KhenThuongKiLuats/' + row.maKtkl).takeUntil(this.unsubscribe).subscribe((res: any) => {
  //       this.formdata = this.fb.group({

  //       });
  //       this.doneSetupForm = true;
  //     });
  //   }, 700);
  // }
  // loseModal() {
  //   $('#createModal').closest('.modal').modal('hide');
  // }
}
