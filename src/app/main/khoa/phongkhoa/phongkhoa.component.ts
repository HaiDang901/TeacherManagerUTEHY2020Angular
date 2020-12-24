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
declare var $: any;
@Component({
  selector: 'app-phongkhoa',
  templateUrl: './phongkhoa.component.html',
  styleUrls: ['./phongkhoa.component.css']
})
export class PhongkhoaComponent extends BaseComponent implements OnInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dsphongkhoas: any;
  // public dsphongkhoa: any;
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
  selectedProducts: dsphongkhoa[];
  statuses: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  first = 0;
  rows = 5;

  @ViewChild('htmlData') htmlData:ElementRef;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private apiService: ApiService, private fb: FormBuilder, injector: Injector, private messageService: MessageService, private confirmationService: ConfirmationService, private coreService: CoreService) {
    super(injector);
  }
dsphongkhoa: dsphongkhoa[];
  cols: any[];
  exportColumns: any[];

      getdsphong(){
        this.coreService.getdsphong().subscribe((update)=>{
          this.dsphongkhoa = update;
          console.log(this.dsphongkhoa);
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
      this.dsphongkhoa = customers;
      this.loading = false;

      this.dsphongkhoa.forEach(
        dsphongkhoa => (dsphongkhoa.ngayTao = new Date(dsphongkhoa.ngayTao))
      );
    });

    this.formsearch = this.fb.group({
      'maPK': ['']
    });
    this.search();
    this.coreService.getCustomersLargePB().then(customers => this.dsphongkhoas = customers);
    this.search();
    this.coreService.getCustomersSmallPB().then(data => this.dsphongkhoa = data);

    this.cols = [
      { field: 'tenPhongKhoa', header: 'Tên Khoa' },
      { field: 'soLuongNhanSu', header: 'Nhân Sự' },
      { field: 'dienThoai', header: 'SĐT' },
      { field: 'email', header: 'Email' },
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
    // this.page = 1;
    // this.pageSize = 5;
    // this._api.post('/api/phieuthu/searchphieuthu',{page: this.page, pageSize: this.pageSize, MaGiaoDich: this.formsearch.get('maPk').value}).takeUntil(this.unsubscribe).subscribe(res => {
    //   this.dsphongkhoas = res.data;
    //   this.totalRecords =  res.totalItems;
    //   this.pageSize = res.pageSize;
    //   });
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



  // onSubmit(value) {
  //   this.submitted = true;
  //   if (this.formdata.invalid) {
  //     return;
  //   }
  // }

  Reset() {
    // this.dsphongkhoas = null;
    // this.formdata = this.fb.group({});
    this.doneSetupForm ={};
  }

  // createModal() {
  //   debugger
  //   this.doneSetupForm = false;
  //   this.showUpdateModal = true;
  //   this.isCreate = true;
  //   this.dsphongkhoas = null;
  //   setTimeout(() => {
  //     $('#createPhieuThuModal').modal('toggle');
  //     this.formdata = this.fb.group({
  //       'Ngay': ['', Validators.required],
  //       'NamTaiKhoa': [''],
  //       'MoTa': [''],
  //       'NguoiThu': [''],
  //       'MaNguoiThu': [''],
  //       'TongTien': [''],
  //       'HoaDonDienTu': [''],
  //       'GhiChu': [''],
  //     });
  //     this.formdata.get('Ngay').setValue(this.today);
  //     this.formdata.get('HoaDonDienTu').setValue(this.hddt[0].value);
  //     this.doneSetupForm = true;
  //   });
  // }

  // public openUpdateModal(row) {
  //   this.doneSetupForm = false;
  //   this.showUpdateModal = true;
  //   this.isCreate = false;
  //   setTimeout(() => {
  //     $('#createPhieuThuModal').modal('toggle');
  //     this._api.get('/api/phieuthu/get-by-id/'+ row.maPhieuThu).takeUntil(this.unsubscribe).subscribe((res:any) => {
  //       this.dsphongkhoas = res;
  //       let Ngay = new Date(this.dsphongkhoas.ngay);
  //         this.formdata = this.fb.group({

  //         });
  //         this.doneSetupForm = true;
  //       });
  //   }, 700);
  // }

  // closeModal() {
  //   $('#createPhieuThuModal').closest('.modal').modal('hide');
  // }
}
