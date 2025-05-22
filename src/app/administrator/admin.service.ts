import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  urlAdmin= ApiConstants.URL_ADMIN;
  

  constructor(private http:HttpClient) { }

//  getList(page: number):Observable<any>{
//     let httpParams = new HttpParams().append('page',page);
//     return this.http.get(`${this.urlCustomer}/listcustomer`,{params:httpParams});
//   }
  authenticate(sUser:any):Observable<any>{
    let httpParams = new HttpParams().append('username',sUser.username).append('password',sUser.password);
    return this.http.get(`${this.urlAdmin}/export-sql`,{responseType: 'blob', params:httpParams});
  }
}
