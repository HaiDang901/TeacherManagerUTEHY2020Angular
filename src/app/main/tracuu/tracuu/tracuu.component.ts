import { CoreService } from './../../../lib/core.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/lib/api.service';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { dscanbo, dsphongkhoa, dsbomon} from '../../../model/danhsach';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { FormControl, FormGroup} from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { DatePipe } from '@angular/common';
import { dsbacluong, khenthuong, trinhdo, dangkilich} from '../../../model/danhsach';
import { jsPDF} from 'jspdf';
import { autoTable} from 'jspdf-autotable';


@Component({
  selector: 'app-tracuu',
  templateUrl: './tracuu.component.html',
  styleUrls: ['./tracuu.component.css']
})
export class TracuuComponent  extends BaseComponent implements OnInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dscanbos: any;
  public dsbacluongs: any;
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
  productDialog: boolean;
  selectedProducts: dscanbo[];
  statuses: any[];
  // loading: boolean = true;
  activityValues: number[] = [0, 100];
  submitted = false;
  first = 0;
  rows = 10;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  @ViewChild('htmlData') htmlData:ElementRef;
  constructor(private apiService: ApiService,
    private fb: FormBuilder,
    injector: Injector,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private coreService: CoreService) {
    super(injector);
  }

  dscanbo: dscanbo[];
  dsbacluong: dsbacluong[];
  cols: any[];
  exportColumns: any[];
  getdscanbo1(): void {
    this._api.get('/api/CanBoGiangViens').subscribe(res=> {
      this.dscanbos = res;
      console.log(res);
    });
  }
  ngOnInit(): void {
    this.getdscanbo1();
      this.coreService.getCustomersLargeGV().then(customers => {
        this.dscanbo = customers;
        // this.loading = false;
        // this.dscanbo.forEach(
        //   dscanbo => (dscanbo.ngaySinh = new Date(dscanbo.ngaySinh)),
        //   dscanbo => (dscanbo.ngayCap = new Date(dscanbo.ngayCap)),
        // );
      });
      this.formsearch = this.fb.group({
        // 'maCbgv': [''],
        'maPK': [''],
        'maBMTT': [''],
        'hoVaTen': [''],
        'gioiTinh': [''],
        'email': [''],
        'dienThoai': [''],
        'queQuan': [''],
        'tonGiao': [''],
        'trinhDo': [''],
      });
    this.search();
    this.coreService.getCustomersLargeGV().then(customers => this.dscanbos = customers);
    this.search();

    this.coreService.getCustomersSmallGV().then(data => this.dscanbo = data);
    this.cols = [
        // { field: 'maCbgv', header: 'MA CAN BO GV' },
        { field: 'maPK', header: 'MA PHONG KHOA' },
        { field: 'maBMTT', header: 'MA BO MON' },
        { field: 'hoVaTen', header: 'HO TEN' },
        { field: 'gioiTinh', header: 'GIOI TINH' },
        { field: 'dienThoai', header: 'DIEN THOAI' },
        { field: 'email', header: 'EMAIL' },
        { field: 'queQuan', header: 'QUE QUAN' },
        { field: 'matKhau', header: 'MAT KHAU' },
        { field: 'tonGiao', header: 'TON GIAO' },
        { field: 'trinhDo', header: 'TRINH DO' },
    ];

    this.exportColumns = this.cols.map(item => ({title: item.header, dataKey: item.field}));
    }
    search() {
      this._core.get('/api/CanBoGiangViens').takeUntil(this.unsubscribe).subscribe(res => {
        this.dscanbos = res;
      });
    }
    get f() { return this.formdata.controls; }

    onlick(tenPhongKhoa:string,tenBmtt:string,gioiTinh:number)
    {
      debugger
      this.coreService.getdscanbo1().subscribe(res=>this.dsbacluongs=res);
    }

}
