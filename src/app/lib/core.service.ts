import { dsbacluong, hopdongld, lylich, giaoviencn, dangkilich, trinhdo, khenthuong, ngachcongchuc, lophoc, sinhvien, phieuthu } from './../model/danhsach';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { catchError, first, map, tap } from 'rxjs/operators';
import { dsluong ,dscanbo, dsphongkhoa, dsbomon} from '../model/danhsach';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public host = environment.apiUrl;
  constructor(private _http: HttpClient, public router: Router) { }

  post(url: string,  obj: any){
    const body = JSON.stringify(obj);
    // let cloneHeader: any = {};
    // cloneHeader['Content-Type'] = 'application/json';
    // const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
    .post<any>(this.host + url, body)
    .pipe(
      map(res =>{
        return res;
      })
    );
  }
  get(url: string){
    // let cloneHeader: any = {};
    // cloneHeader['Content-Type'] = 'application/json';
    // const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
    .get(this.host +url)
    .pipe(
      map( res=>{
        return res;
      })
    );
  }
// ----------------------------------------------------------------------------------------//
// ----------------------------------------------------------------------------------------//
// ----------------------------------------------------------------------------------------//
// -------------------------------Phan Trang------------------------//
// Phân trang Bộ môn
    getCustomersSmall() {
      return this._http.get<any>(this.host +'/api/CanBoGiangViens')
          .toPromise()
          .then(res => <dsbomon[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMedium() {
      return this._http.get<any>(this.host +'/api/CanBoGiangViens')
          .toPromise()
          .then(res => <dsbomon[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLarge() {
      return this._http.get<any>(this.host +'/api/CanBoGiangViens')
          .toPromise()
          .then(res => <dsbomon[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLarge() {
      return this._http.get<any>(this.host +'/api/CanBoGiangViens')
          .toPromise()
          .then(res => <dsbomon[]>res.data)
          .then(data => { return data; });
    }
    // Phân trang Bậc Lương
    getCustomersSmallBL() {
      return this._http.get<any>(this.host +'/api/BacLuongs')
          .toPromise()
          .then(res => <dsbacluong[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumBL() {
      return this._http.get<any>(this.host +'/api/BacLuongs')
          .toPromise()
          .then(res => <dsbacluong[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargeBL() {
      return this._http.get<any>(this.host +'/api/BacLuongs')
          .toPromise()
          .then(res => <dsbacluong[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargeBL() {
      return this._http.get<any>(this.host +'/api/BacLuongs')
          .toPromise()
          .then(res => <dsbacluong[]>res.data)
          .then(data => { return data; });
    }
    // Phân trang GiaoVieen
    getCustomersSmallGV() {
      return this._http.get<any>(this.host +'api/CanBoGiangViens')
          .toPromise()
          .then(res => <dscanbo[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumGV() {
      return this._http.get<any>(this.host +'api/CanBoGiangViens')
          .toPromise()
          .then(res => <dscanbo[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargeGV() {
      return this._http.get<any>(this.host +'api/CanBoGiangViens')
          .toPromise()
          .then(res => <dscanbo[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargeGV() {
      return this._http.get<any>(this.host +'api/CanBoGiangViens')
          .toPromise()
          .then(res => <dscanbo[]>res.data)
          .then(data => { return data; });
    }
    // Phân trang Lương
    getCustomersSmallL() {
      return this._http.get<any>(this.host +'api/Luongs')
          .toPromise()
          .then(res => <dsluong[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumL() {
      return this._http.get<any>(this.host +'/api/Luongs')
          .toPromise()
          .then(res => <dsluong[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargeL() {
      return this._http.get<any>(this.host +'/api/Luongs')
          .toPromise()
          .then(res => <dsluong[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargeL() {
      return this._http.get<any>(this.host +'/api/Luongs')
          .toPromise()
          .then(res => <dsluong[]>res.data)
          .then(data => { return data; });
    }
    // Phân trang Phòng Ban
    getCustomersSmallPB() {
      return this._http.get<any>(this.host +'api/PhongKhoas')
          .toPromise()
          .then(res => <dsphongkhoa[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumPB() {
      return this._http.get<any>(this.host +'/api/PhongKhoas')
          .toPromise()
          .then(res => <dsphongkhoa[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargePB() {
      return this._http.get<any>(this.host +'/api/PhongKhoas')
          .toPromise()
          .then(res => <dsphongkhoa[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargePB() {
      return this._http.get<any>(this.host +'/api/PhongKhoas')
          .toPromise()
          .then(res => <dsphongkhoa[]>res.data)
          .then(data => { return data; });
    }

    // --------------------------Mới thêm ngày 22/12----------
    // Phân trang Hợp đồng
    getCustomersSmallHD() {
      return this._http.get<any>(this.host +'api/TblHopDongLds')
          .toPromise()
          .then(res => <hopdongld[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumHD() {
      return this._http.get<any>(this.host +'/api/TblHopDongLds')
          .toPromise()
          .then(res => <hopdongld[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargeHD() {
      return this._http.get<any>(this.host +'/api/TblHopDongLds')
          .toPromise()
          .then(res => <hopdongld[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargeHD() {
      return this._http.get<any>(this.host +'/api/TblHopDongLds')
          .toPromise()
          .then(res => <hopdongld[]>res.data)
          .then(data => { return data; });
    }
    // Phân trang Lý lịch
    getCustomersSmallLL() {
      return this._http.get<any>(this.host +'api/LyLichGvs')
          .toPromise()
          .then(res => <lylich[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumLL() {
      return this._http.get<any>(this.host +'/api/LyLichGvs')
          .toPromise()
          .then(res => <lylich[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargeLL() {
      return this._http.get<any>(this.host +'/api/LyLichGvs')
          .toPromise()
          .then(res => <lylich[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargeLL() {
      return this._http.get<any>(this.host +'/api/LyLichGvs')
          .toPromise()
          .then(res => <lylich[]>res.data)
          .then(data => { return data; });
    }
    // Phân trang Chủ Nhiệm
    getCustomersSmallCN() {
      return this._http.get<any>(this.host +'api/GiaoVienChuNhiems')
          .toPromise()
          .then(res => <giaoviencn[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumCN() {
      return this._http.get<any>(this.host +'/api/GiaoVienChuNhiems')
          .toPromise()
          .then(res => <giaoviencn[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargeCN() {
      return this._http.get<any>(this.host +'/api/GiaoVienChuNhiems')
          .toPromise()
          .then(res => <giaoviencn[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargeCN() {
      return this._http.get<any>(this.host +'/api/GiaoVienChuNhiems')
          .toPromise()
          .then(res => <giaoviencn[]>res.data)
          .then(data => { return data; });
    }
    // Phân trang Lịch Dạy
    getCustomersSmallLD() {
      return this._http.get<any>(this.host +'api/DkgiangDays')
          .toPromise()
          .then(res => <dangkilich[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumLD() {
      return this._http.get<any>(this.host +'/api/DkgiangDays')
          .toPromise()
          .then(res => <dangkilich[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargeLD() {
      return this._http.get<any>(this.host +'/api/DkgiangDays')
          .toPromise()
          .then(res => <dangkilich[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargeLD() {
      return this._http.get<any>(this.host +'/api/DkgiangDays')
          .toPromise()
          .then(res => <dangkilich[]>res.data)
          .then(data => { return data; });
    }

    // Phân trang Hoc Vấn
    getCustomersSmallHV() {
      return this._http.get<any>(this.host +'api/TrinhDoHocVans')
          .toPromise()
          .then(res => <trinhdo[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumHV() {
      return this._http.get<any>(this.host +'/api/TrinhDoHocVans')
          .toPromise()
          .then(res => <trinhdo[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargeHV() {
      return this._http.get<any>(this.host +'/api/TrinhDoHocVans')
          .toPromise()
          .then(res => <trinhdo[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargeHV() {
      return this._http.get<any>(this.host +'/api/TrinhDoHocVans')
          .toPromise()
          .then(res => <trinhdo[]>res.data)
          .then(data => { return data; });
    }

    // Phân trang Khen Thưởng
    getCustomersSmallKT() {
      return this._http.get<any>(this.host +'api/KhenThuongKiLuats')
          .toPromise()
          .then(res => <khenthuong[]>res.data)
          .then(data => { return data; });
    }
    getCustomersMediumKT() {
      return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
          .toPromise()
          .then(res => <khenthuong[]>res.data)
          .then(data => { return data; });
    }
    getCustomersLargeKT() {
      return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
          .toPromise()
          .then(res => <khenthuong[]>res.data)
          .then(data => { return data; });
    }
    getCustomersXLargeKT() {
      return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
          .toPromise()
          .then(res => <khenthuong[]>res.data)
          .then(data => { return data; });
    }
    ///--------------------------------------------------///
    //--------------------------------------------------///
    //---------------------------------------------------///
    //-----------------------------Khen Thưởng-----------///
    getdsKT(): Observable<khenthuong[]>{
      let cloneHeader: any ={};
      cloneHeader['Content-Type'] = 'application/json';
      const  headerOptions = new HttpHeaders(cloneHeader);
      return this._http.get<khenthuong[]>(this.host +'/api/KhenThuongKiLuats', {headers: headerOptions}).pipe(
        tap(receivedMovies => console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error =>of([]))
      );
    }
    postKT(obj: khenthuong): Observable<khenthuong> {
      const url = `${this.host}/api/KhenThuongKiLuats`;
      return this._http
        .post<khenthuong>(url, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    getbyidKT(id: any): Observable<khenthuong>{
      const url = `${this.host}/api/KhenThuongKiLuats`;
      return this._http.get<khenthuong>(url+ "/" + id).pipe(
        map(res => {
          return res;
        })
      );
    }
    updateKT( id : any, obj: khenthuong): Observable<khenthuong> {
      const url = `${this.host}/api/KhenThuongKiLuats`;
      obj.maKtkl=id;
      return this._http
        .put<khenthuong>(url + "/" + id, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    deleteKT(id: any){
      const url = `${this.host}/api/KhenThuongKiLuats`;
      return this._http
        .delete<khenthuong>(url +"/" + id)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    //-----------------------------HỌC VẤN----------------------///
    getdsHV(): Observable<trinhdo[]>{
      let cloneHeader: any ={};
      cloneHeader['Content-Type'] = 'application/json';
      const  headerOptions = new HttpHeaders(cloneHeader);
      return this._http.get<trinhdo[]>(this.host +'/api/TrinhDoHocVans', {headers: headerOptions}).pipe(
        tap(receivedMovies => console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error =>of([]))
      );
    }
    postHV(obj: trinhdo): Observable<trinhdo> {
      const url = `${this.host}/api/TrinhDoHocVans`;
      return this._http
        .post<trinhdo>(url, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    getbyidHV(id: any): Observable<trinhdo>{
      const url = `${this.host}/api/TrinhDoHocVans`;
      return this._http.get<trinhdo>(url+ "/" + id).pipe(
        map(res => {
          return res;
        })
      );
    }
    updateHV( id : any, obj: trinhdo): Observable<trinhdo> {
      const url = `${this.host}/api/TrinhDoHocVans`;
      obj.maTdhv=id;
      return this._http
        .put<trinhdo>(url + "/" + id, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    deleteHV(id: any){
      const url = `${this.host}/api/TrinhDoHocVans`;
      return this._http
        .delete<trinhdo>(url +"/" + id)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    //-----------------------------ĐĂNG KÍ GIẢNG DẠY -----------///
    getdsGD(): Observable<dangkilich[]>{
      let cloneHeader: any ={};
      cloneHeader['Content-Type'] = 'application/json';
      const  headerOptions = new HttpHeaders(cloneHeader);
      return this._http.get<dangkilich[]>(this.host +'/api/DkgiangDays', {headers: headerOptions}).pipe(
        tap(receivedMovies => console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error =>of([]))
      );
    }
    postGD(obj: dangkilich): Observable<dangkilich> {
      const url = `${this.host}/api/DkgiangDays`;
      return this._http
        .post<dangkilich>(url, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    getbyidGD(id: any): Observable<dangkilich>{
      const url = `${this.host}/api/DkgiangDays`;
      return this._http.get<dangkilich>(url+ "/" + id).pipe(
        map(res => {
          return res;
        })
      );
    }
    updateGD( id : any, obj: dangkilich): Observable<dangkilich> {
      const url = `${this.host}/api/TblDkgiangDays`;
      obj.maDkgd=id;
      return this._http
        .put<dangkilich>(url + "/" + id, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    deleteGD(id: any){
      const url = `${this.host}/api/DkgiangDays`;
      return this._http
        .delete<dangkilich>(url +"/" + id)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    //-----------------------------HỢP ĐỒNG--------------------///
    getdsHD(): Observable<hopdongld[]>{
      let cloneHeader: any ={};
      cloneHeader['Content-Type'] = 'application/json';
      const  headerOptions = new HttpHeaders(cloneHeader);
      return this._http.get<hopdongld[]>(this.host +'/api/TblHopDongLds', {headers: headerOptions}).pipe(
        tap(receivedMovies => console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error =>of([]))
      );
    }
    postHD(obj: hopdongld): Observable<hopdongld> {
      const url = `${this.host}/api/TblHopDongLds`;
      return this._http
        .post<hopdongld>(url, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    getbyidHD(id: any): Observable<hopdongld>{
      const url = `${this.host}/api/TblHopDongLds`;
      return this._http.get<hopdongld>(url+ "/" + id).pipe(
        map(res => {
          return res;
        })
      );
    }
    updateHD( id : any, obj: hopdongld): Observable<hopdongld> {
      const url = `${this.host}/api/TblHopDongLds`;
      obj.maHd=id;
      return this._http
        .put<hopdongld>(url + "/" + id, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    deleteHD(id: any){
      const url = `${this.host}/api/TblHopDongLds`;
      return this._http
        .delete<hopdongld>(url +"/" + id)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    //-----------------------------lÝ LỊCH GIÁO VIÊN-----------///
    getdsLL(): Observable<lylich[]>{
      let cloneHeader: any ={};
      cloneHeader['Content-Type'] = 'application/json';
      const  headerOptions = new HttpHeaders(cloneHeader);
      return this._http.get<lylich[]>(this.host +'/api/LyLichGvs', {headers: headerOptions}).pipe(
        tap(receivedMovies => console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error =>of([]))
      );
    }
    postLL(obj: lylich): Observable<lylich> {
      const url = `${this.host}/api/LyLichGvs`;
      return this._http
        .post<lylich>(url, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    getbyidLL(id: any): Observable<lylich>{
      const url = `${this.host}/api/LyLichGvs`;
      return this._http.get<lylich>(url+ "/" + id).pipe(
        map(res => {
          return res;
        })
      );
    }
    updateLL( id : any, obj: lylich): Observable<lylich> {
      const url = `${this.host}/api/LyLichGvs`;
      obj.maLl=id;
      return this._http
        .put<lylich>(url + "/" + id, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    deleteLL(id: any){
      const url = `${this.host}/api/LyLichGvs`;
      return this._http
        .delete<lylich>(url +"/" + id)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    //-----------------------------CHỦ NHIỆM -----------///
    getdsCN(): Observable<giaoviencn[]>{
      let cloneHeader: any ={};
      cloneHeader['Content-Type'] = 'application/json';
      const  headerOptions = new HttpHeaders(cloneHeader);
      return this._http.get<giaoviencn[]>(this.host +'/api/GiaoVienChuNhiems', {headers: headerOptions}).pipe(
        tap(receivedMovies => console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error =>of([]))
      );
    }
    postCN(obj: giaoviencn): Observable<giaoviencn> {
      const url = `${this.host}/api/GiaoVienChuNhiems`;
      return this._http
        .post<giaoviencn>(url, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    getbyidCN(id: any): Observable<giaoviencn>{
      const url = `${this.host}/api/GiaoVienChuNhiems`;
      return this._http.get<giaoviencn>(url+ "/" + id).pipe(
        map(res => {
          return res;
        })
      );
    }
    updateCN( id : any, obj: giaoviencn): Observable<giaoviencn> {
      const url = `${this.host}/api/GiaoVienChuNhiems`;
      obj.maGvcn=id;
      return this._http
        .put<giaoviencn>(url + "/" + id, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    deleteCN(id: any){
      const url = `${this.host}/api/GiaoVienChuNhiems`;
      return this._http
        .delete<giaoviencn>(url +"/" + id)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    //-----------------------------pHIẾU  THU-----------///
    // ---------------------------Bộ Môn----------------///
    getdsbomon(): Observable<dsbomon[]>{
      let cloneHeader: any ={};
        cloneHeader['Content-Type'] = 'application/json';
        const  headerOptions = new HttpHeaders(cloneHeader);
      return this._http.get<dsbomon[]>(this.host +'/api/BoMonTrungTams', {headers: headerOptions}).pipe(
        tap(receivedMovies=>console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
        catchError(error=>of([]))
      )
    }
    postbomon(obj: dsbomon): Observable<dsbomon> {
      const url = `${this.host}/api/BoMonTrungTams`;
      return this._http
        .post<dsbomon>(url, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    getbyidBM(id: any): Observable<dsbomon>{
      const url = `${this.host}/api/BoMonTrungTams`;
      return this._http.get<dsbomon>(url + "/get-by-id/"+ id).pipe(
        map(res => {
          return res;
        })
      );
    }
    updatebomon( id: any, obj: dsbomon): Observable<dsbomon> {
      const url = `${this.host}/api/BoMonTrungTams`;
      obj.maBmtt = id;
      return this._http
        .put<dsbomon>(url +"/" + id, obj)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
    deleteBM(id: any){
      const url = `${this.host}/api/BoMonTrungTams`;
      return this._http
        .delete<dsbomon>(url +"/" + id)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
     //Phòng Khoa
  getdsphong(): Observable<dsphongkhoa[]>{
    let cloneHeader: any ={};
      cloneHeader['Content-Type'] = 'application/json';
      const  headerOptions = new HttpHeaders(cloneHeader);
    return this._http.get<dsphongkhoa[]>(this.host +'api/PhongKhoas', {headers: headerOptions}).pipe(
      tap(receivedMovies=>console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error=>of([]))
    );
  }
  postphong(obj: dsphongkhoa): Observable<dsphongkhoa> {
    const url = `${this.host}/api/PhongKhoas`;
    return this._http
      .post<dsphongkhoa>(url, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  getbyidPK(id: any): Observable<dsphongkhoa>{
    const url = `${this.host}/api/PhongKhoas`;
    return this._http.get<dsphongkhoa>(url + "/GetPhongKhoaDetails/"+ id).pipe(
      map(res => {
        return res;
      })
    );
  }
  updatePK( id : any, obj: dsphongkhoa): Observable<dsphongkhoa> {
    const url = `${this.host}/api/PhongKhoas`;
    obj.maPk=id;
    return this._http
      .put<dsphongkhoa>(url +"/" + id, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  deletePK(id: any){
    const url = `${this.host}/api/PhongKhoas`;
    return this._http
      .delete<dsphongkhoa>(url +"/" + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }


































        // // Phân trang Ngach Công CHức
    // getCustomersSmallNCC() {
    //   return this._http.get<any>(this.host +'api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <ngachcongchuc[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersMediumNCC() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <ngachcongchuc[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersLargeNCC() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <ngachcongchuc[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersXLargeNCC() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <ngachcongchuc[]>res.data)
    //       .then(data => { return data; });
    // }
    // // Phân trang Lớp Học
    // getCustomersSmallLH() {
    //   return this._http.get<any>(this.host +'api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <lophoc[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersMediumLH() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <lophoc[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersLargeLH() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <lophoc[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersXLargeLH() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <lophoc[]>res.data)
    //       .then(data => { return data; });
    // }
    // // Phân trang Sinh Viên
    // getCustomersSmallSV() {
    //   return this._http.get<any>(this.host +'api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <sinhvien[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersMediumSV() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <sinhvien[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersLargeSV() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <sinhvien[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersXLargeSV() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <sinhvien[]>res.data)
    //       .then(data => { return data; });
    // }
    // // Phân trang Phiếu Thu
    // getCustomersSmallPT() {
    //   return this._http.get<any>(this.host +'api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <phieuthu[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersMediumPT() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <phieuthu[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersLargePT() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <phieuthu[]>res.data)
    //       .then(data => { return data; });
    // }
    // getCustomersXLargePT() {
    //   return this._http.get<any>(this.host +'/api/KhenThuongKiLuats')
    //       .toPromise()
    //       .then(res => <phieuthu[]>res.data)
    //       .then(data => { return data; });
    // }

}
