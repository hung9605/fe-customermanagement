import { Injectable } from '@angular/core';
import { ApiConstants } from '../common/constants/ApiConstant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  url = ApiConstants.URL_CONFIG;

  constructor(private http: HttpClient) { }

  getConfig():Observable<any>{
      return this.http.get(`${this.url}/getall`);
  }

  updateConfig(data: any):Observable<any>{
      return this.http.post(`${this.url}/update`,data);
  }
}
