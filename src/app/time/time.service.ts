import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TimeConfigDto } from './TimeConfigDto';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private readonly urlAdmin= ApiConstants.URL_ADMIN;
  constructor(private http: HttpClient) { }

  configtime(timeConfig:TimeConfigDto):Observable<any>{
      return this.http.post(`${this.urlAdmin}/configtime`,timeConfig);
  }
}
