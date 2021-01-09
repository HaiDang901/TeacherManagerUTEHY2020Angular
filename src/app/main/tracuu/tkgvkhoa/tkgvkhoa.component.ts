import { BaseComponent } from './../../../lib/base-component';
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input,ElementRef  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { FormControl, FormGroup} from '@angular/forms' ;
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { AuthenticationService } from '../../../lib/authentication.service';
import { CoreService } from './../../../lib/core.service';
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
  selector: 'app-tkgvkhoa',
  templateUrl: './tkgvkhoa.component.html',
  styleUrls: ['./tkgvkhoa.component.css']
})
export class TkgvkhoaComponent extends BaseComponent implements OnInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dscanbos: any;
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
  public hiddenID:number;
  productDialog: boolean;
  selectedProducts: dscanbo[];
  statuses: any[];
  dsphongkhoa: dsphongkhoa[];
  activityValues: number[] = [0, 100];
  submitted = false;
  first = 0;
  rows = 10;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  @ViewChild('htmlData') htmlData:ElementRef;
  constructor(private fb: FormBuilder, injector: Injector,
              private authenticationService: AuthenticationService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private coreService: CoreService) {
    super(injector);
  }
  getdsphong(){
    this._api.get('/api/PhongKhoas').subscribe(res=> {
      this.dsphongkhoas = res;
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.getdsphong();
    // this._core.get('/api/PhongKhoas/GetPhongKhoaDetails/CNTT').takeUntil(this.unsubscribe).subscribe(res => {
    //   this.dscanbos = res;
    //   console.log(this.dscanbos);
    //   });
  }
  SelectSemester(value){
      console.log(value);
      this._api.get('/api/CanBoGiangViens/getgvbypk/' + value).subscribe(res=> {
        this.dscanbos = res;
      });
      console.log(this.dscanbos);
  }
}
