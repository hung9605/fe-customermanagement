import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmenuService {

  url = environment.urlApi+"/menu";
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
