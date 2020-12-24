import { dsbacluong } from './../model/danhsach';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { catchError, map, tap, first } from 'rxjs/operators';
import { dsluong ,dscanbo, dsphongkhoa, dsbomon} from '../model/danhsach';

import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public host = environment.apiUrl;
  constructor(private _http: HttpClient, public router: Router) {}

  // Lấy API
  // private dscanbourl = "https://localhost:44341/api/TblCanBoGiangViens";
  // private dsphongurl = "https://localhost:44341/api/PhongKhoas";
  // private dsbomonurl = "https://localhost:44341/api/BoMonTrungTams";
  // private api_bac_luong='https://localhost:44341/api/TblBacLuongs';
  // private api_luong ='https://localhost:44341/api/TblLuongs';

  // private dscanbourl = "https://localhost:44398/api/CanBoGiangViens";
  // private dsphongurl = "https://localhost:44398/api/PhongKhoas";
  // private dsbomonurl = "https://localhost:44398/api/BoMonTrungTams";
  // private api_bac_luong = 'https://localhost:44398/api/BacLuongs';
  // private api_luong ="https://localhost:44398/api/Luongs";

  private dscanbourl = "https://localhost:44351/api/CanBoGiangViens";
  private dsphongurl = "https://localhost:44351/api/PhongKhoas";
  private dsbomonurl = "https://localhost:44351/api/BoMonTrungTams";
  private api_bac_luong = "https://localhost:44351/api/BacLuongs";
  private api_luong ="https://localhost:44351/api/Luongs";


  //Bậc Lương
  // public get_bac_luong(): Observable<any[]>{
  //   return this._http.get<any[]>(this.api_bac_luong);
  // }
  //

  post(url: string, obj: any) {
   // debugger;
    const body = JSON.stringify(obj);
    // let cloneHeader: any = {};
    // cloneHeader['Content-Type'] = 'application/json';
    // const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
      .post<any>(this.host + url, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  //kết thúc api cho bậc lương(có thể dùng chung)

  get(url: string) {
    // let cloneHeader: any = {};
    // cloneHeader['Content-Type'] = 'application/json';
    // const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
      .get(this.host + url)
      .pipe(
        map(res  => {
          return res;
        })
      );
  }
  //Test
  //Cán bộ giáo Viên
  getdscanbo(): Observable<dscanbo[]>{
    return this._http.get<dscanbo[]>(this.dscanbourl).pipe(
      tap(receivedMovies => console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error =>of([]))
    )
  }
  postcanbo(obj: dscanbo): Observable<dscanbo> {
    return this._http
      .post<dscanbo>(this.dscanbourl, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
    }

  getbyid(id: any): Observable<dscanbo>{
    return this._http.get<dscanbo>(this.dscanbourl + "/get-by-id/" + id).pipe(
      map(res => {
        return res;
      })
    );
  }
  updatecanbo( id : any, obj: dscanbo): Observable<dscanbo> {

    return this._http
      .put<dscanbo>(this.dscanbourl + "/" + id, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  deletecanbo(id: any){
    return this._http
      .delete<dscanbo>(this.dscanbourl +"/" + id)
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
    return this._http.get<dsphongkhoa[]>(this.dsphongurl, {headers: headerOptions}).pipe(
      tap(receivedMovies=>console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error=>of([]))
    );
  }
  postphong(obj: dsphongkhoa): Observable<dsphongkhoa> {
    return this._http
      .post<dsphongkhoa>(this.dsphongurl, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  getbyidPK(id: any): Observable<dsphongkhoa>{
    return this._http.get<dsphongkhoa>(this.dsphongurl + "/GetPhongKhoaDetails/"+ id).pipe(
      map(res => {
        return res;
      })
    );
  }
  updatePK( id : any, obj: dsphongkhoa): Observable<dsphongkhoa> {

    obj.maPk=id;
    return this._http
      .put<dsphongkhoa>(this.dsphongurl +"/" + id, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  deletePK(id: any){
    return this._http
      .delete<dsphongkhoa>(this.dsphongurl +"/" + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
    //Bộ Môn
  getdsbomon(): Observable<dsbomon[]>{
    return this._http.get<dsbomon[]>(this.dsbomonurl).pipe(
      tap(receivedMovies=>console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error=>of([]))
    )
  }
  postbomon(obj: dsbomon): Observable<dsbomon> {
    return this._http
      .post<dsbomon>(this.dsbomonurl, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  getbyidBM(id: any): Observable<dsbomon>{
    return this._http.get<dsbomon>(this.dsbomonurl + "/get-by-id/"+ id).pipe(
      map(res => {
        return res;
      })
    );
  }
  updatebomon( id: any, obj: dsbomon): Observable<dsbomon> {

    return this._http
      .put<dsbomon>(this.dsbomonurl +"/" + id, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  deleteBM(id: any){
    return this._http
      .delete<dsbomon>(this.dsbomonurl +"/" + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  //Bậc Lương
    getdsBL(): Observable<dsbacluong[]>{

    return this._http.get<dsbacluong[]>(this.api_bac_luong).pipe(
      tap(receivedMovies => console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
      catchError(error => of([]))
    );
  }
  // getBL(): Observable<any>{
  //   let cloneHeader : any = {};
  //   cloneHeader['Content-Type'] = 'application/json';
  //   const headerOptions = new HttpHeaders(cloneHeader);
  //   return this._http.get(this.api_bac_luong,{headers: headerOptions}).pipe(first());
  // }
  postBL(obj: dsbacluong): Observable<dsbacluong> {
    return this._http
      .post<dsbacluong>(this.dscanbourl, obj)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  getbyidBL(id: any): Observable<dsbacluong>{
    return this._http.get<dsbacluong>(this.api_bac_luong + "/" + id).pipe(
      map(res => {
        return res;
      })
    );
  }
  updateBL( id: any, obj: dsbacluong): Observable<dsbacluong> {
    return this._http.put<dsbacluong>(this.api_bac_luong + "/" + id, obj).pipe(
        map(res => {
          return res;
        })
      );
  }
  deleteBL(id: any){
    return this._http
      .delete<dsbacluong>(this.api_bac_luong + "/" + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  // lương
getdsluong(): Observable<dsluong[]>{
  return this._http.get<dsluong[]>(this.api_luong).pipe(
    tap(receivedMovies => console.log(`receivedMovies =${JSON.stringify(receivedMovies)}`)),
    catchError(error => of([]))
  )
}
postluong(obj: dsluong): Observable<dsluong> {
   return this._http
     .post<dsluong>(this.api_luong, obj)
     .pipe(
       map(res => {
         return res;
       })
     );
 }
 getbyidluong(id: any): Observable<dsluong>{
  return this._http.get<dsluong>(this.dscanbourl + "/" + id).pipe(
    map(res => {
      return res;
    })
  );
}
updateluong( id : any, obj: dsluong): Observable<dsluong> {

  return this._http
    .put<dsluong>(this.api_luong + "/" + id, obj)
    .pipe(
      map(res => {
        return res;
      })
    );
}
deleteluong(id: any){
  return this._http
    .delete<dsluong>(this.api_luong + "/" + id)
    .pipe(
      map(res => {
        return res;
      })
    );
}
  // End Test
}
