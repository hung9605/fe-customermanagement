import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class AdmenuService {

  url = ApiConstants.URL_MENU;
  constructor(private http:HttpClient) { }
  
  getMenu():Observable<any>{
    return this.http.get(`${this.url}/list`);
  }
  
  addMenu(obj:any):Observable<any>{
    return this.http.post(`${this.url}/add`,obj);
  }

  updateVisible(obj:any):Observable<any>{
    return this.http.post(`${this.url}/updateVisible`,obj);
  }

  deleteMenu(obj:any):Observable<any>{
    return this.http.post(`${this.url}/delete`,obj);
  }

  private _listeners = new Subject<any>();
    listen(): Observable<any>{
      return this._listeners.asObservable();
    }
    closeDialog(){
      this._listeners.next("closed");
    }
}
