
import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/lib/api.service';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { dsluong,dscanbo, dsphongkhoa, dsbomon} from '../../../model/danhsach';
declare var $: any;

@Component({
  selector: 'app-luong',
  templateUrl: './luong.component.html',
  styleUrls: ['./luong.component.css']
})
export class LuongComponent extends BaseComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  public dsluongs: any;
  // public dscanbo: any;
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
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private apiService: ApiService, private fb: FormBuilder, injector: Injector) {
    super(injector);
  }
  dsl: dsluong[];
  getdsluong(): void {
    this.apiService.getdsluong().subscribe((update) => {
      this.dsl = update;
    });
  }
  showAdd() {
    this.isCreate=true;
    this.hiddenID = 0;
    this.doneSetupForm = {};
    this.lgModal.show();
  }
  ngOnInit(): void {
    this.getdsluong();

    this.formsearch = this.fb.group({
      'maLuong': ['']
    });
    this.search();
  }

  loadPage(page) {
    this._api.post('/api/CanBoGiangViens/searchgiaovien/', { page: page, pageSize: this.pageSize }).takeUntil(this.unsubscribe).subscribe(res => {
      this.dsluongs = res.data;
      this.totalRecords = res.totalItems;
      this.pageSize = res.pageSize;
    });
  }
  search() {
    this._api.get('/api/CanBoGiangViens/searchgiaovien').takeUntil(this.unsubscribe).subscribe(res => {
      this.dsluongs = res;
    });
  }

  get f() { return this.formdata.controls; }

  showEdit(id :any ){
    this.isCreate=false;
    this.hiddenID = 1;
    this.apiService.getbyidluong(id).subscribe(res=>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  save(val: dsluong) {
  console.log(val);
    if (this.hiddenID == 0) {

      this.apiService.postluong(val).subscribe(res => {
        alert("Them thanh cong!");
        this.lgModal.hide();
        this.getdsluong();
      });
    }
    else{
      this.apiService.updateluong(val.maLuong, val).subscribe(res =>{
        alert("Sửa thành công");
        this.lgModal.hide();
        this.getdsluong();
      });
    }
  }
  ChiTiet(id :any ){
    this.isCreate = true;
    this.apiService.getbyidluong(id).subscribe(res=>{
      this.doneSetupForm = res;
    });
    this.lgModal.show();
  }
  Delete(id :any){
    var r = confirm("Bạn có muốn xóa không?");
    if(r==true){
      this.apiService.deleteluong(id).subscribe(res=>{
        alert("Xóa thành công");
        this.getdsluong();
      });
    }

  }
  Reset(){
    this.doneSetupForm ={};
  }


}



