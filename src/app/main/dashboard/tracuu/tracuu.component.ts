import { dsphongkhoa, dscanbo, dsbomon } from './../../../model/danhsach';

import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms'
import { BaseComponent } from '../../../lib/base-component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../../lib/authentication.service';
import { ApiService } from '@app/lib/api.service';
import { CoreService } from '@app/lib/core.service';
import { ConfirmationService, MessageService } from 'primeng/api';
declare var $: any;


@Component({
  selector: 'app-tracuu',
  templateUrl: './tracuu.component.html',
  styleUrls: ['./tracuu.component.css']
})
export class TracuuComponent extends BaseComponent implements OnInit  {
  public dsphongkhoas: any;
  public dsbomons: any;
  public dscanbo:any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formds: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal:any;
  public isCreate:any;
  public check: any;
  public maBmtt:any;
  public maPk:any;
  submitted = false;
  public formsearch: any;
  public hiddenID:number;
  productDialog: boolean;
  selectedProducts: dscanbo[];

  first = 0;

  rows = 10;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private apiService: ApiService, private fb: FormBuilder, injector: Injector,private messageService: MessageService, private confirmationService: ConfirmationService, private coreService: CoreService, private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.formds = this.fb.group({
      'maPk': [''],
      'maBmtt': [''],
    });
    // this.formds.get('Buoi').setValue('Sang');
    this.check=true;
    this.isCreate=false;
    this._core.get('/api/PhongKhoas').takeUntil(this.unsubscribe).subscribe(res => {
      this.dsphongkhoas= res;
      this.formds.get('maPk').setValue(this.dsphongkhoas[0].maPk);
      });
    this._core.get('/api/BoMonTrungTams/dsbomon').takeUntil(this.unsubscribe).subscribe(res => {
        this.dsbomons= res;
        this.formds.get('maBmtt').setValue(this.dsbomons[0].maBmtt);
        });

  }
  get f() { return this.formdata.controls; }

  onSubmit(form: any): void{
    console.log(form);
    let date= new Date();
    let ngay =this.datePipe.transform(date,"yyyy-MM-dd");
    let tmp = {
      maPk: this.maPk ,
      MaCbgv:this.authenticationService.userValue.id,
      maBmtt:this.maBmtt,
      };
      // this._api.post('/api/diemdanh/create-diem-danh',tmp).takeUntil(this.unsubscribe).subscribe(res => {
        this._core.get('/api/CanBoGiangViens/dscanbo').takeUntil(this.unsubscribe).subscribe(res => {
          this.dscanbo=res;
        });
      // });
    let i:number=0;
    for (let index = 0; index < this.dsbomons.length; index++) {
      let tmp = {
        maCbgv:this.dscanbo[0].maCbgv,
        maBmtt:this.dsbomons[index].maBmtt,
        // TrangThai:form.,
        };
        console.log(tmp);

    }
  }
    LayDs(){
      this.check= false;
      this.isCreate=true;
      this.maPk=this.formds.get('maPk').value;
      this.maBmtt=this.formds.get('maBmtt').value;
      this._core.get('/api/PhongKhoas/GetPhongKhoaDetails/'+this.formds.get('maPk').value).takeUntil(this.unsubscribe).subscribe(res => {
        this.dscanbo= res;
        });
    }
  }
