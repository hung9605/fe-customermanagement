import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url = environment.urlApi+"/menu";

  constructor(private http:HttpClient) { }

  getMenu():Observable<any>{
    return this.http.get(`${this.url}/list`);
  }

  addMenu(obj:any):Observable<any>{
    console.log('menu', obj);
    
    return this.http.post(`${this.url}/add`,obj);
  }
}
