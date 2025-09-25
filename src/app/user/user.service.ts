import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../common/constants/ApiConstant';
import { Observable, Subject } from 'rxjs';
import User from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly urlUser = ApiConstants.URL_USER;
  private readonly urlrole = ApiConstants.URL_AUTHORITY;

  constructor(private http: HttpClient) { }

  getList():Observable<any>{
      return this.http.get(`${this.urlUser}/list`);
  }

  getAccount():Observable<any>{
      return this.http.get(`${this.urlUser}/dashboard`);
  }

  add(obj: User):Observable<any>{
    return this.http.post(`${this.urlUser}/add`,obj)
  }

  getRole(username: string):Observable<any>{
    let httpParams = new HttpParams().set('username',username);
    return this.http.get(`${this.urlrole}/getRole`,{params:httpParams});
  }

  private _listener = new Subject<any>();
  listen(): Observable<any>{
    return this._listener.asObservable();
  }
  close(){
    this._listener.next('reload');
  }

}