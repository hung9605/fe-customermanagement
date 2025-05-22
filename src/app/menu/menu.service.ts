import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly url = ApiConstants.URL_MENU;

  constructor(private http:HttpClient) { }

  getMenu():Observable<any>{
    return this.http.get(`${this.url}/list`);
  }

  addMenu(obj:any):Observable<any>{    
    return this.http.post(`${this.url}/add`,obj);
  }
}
