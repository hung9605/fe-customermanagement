import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../common/constants/ApiConstant';
import { Observable } from 'rxjs';
import User from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly urlUser = ApiConstants.URL_USER;

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


}