import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'https://localhost:44351/api/CanBoGiangViens/dscanbo'
@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  getAllPosts() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getAllPost(params): Observable<any> {
    return this.http.get(baseUrl, { params });
  }
}
