import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  urlCustomer = ApiConstants.URL_CUSTOMER;
  urlScheduleMedical = ApiConstants.URL_SCHEDULE_MEDICAL;

  constructor(private http: HttpClient) { }

  addCustomer(customer:any): Observable<any>{
      return this.http.post(`${this.urlCustomer}/add`,customer);
  }

  addScheduleMedical(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlScheduleMedical}/add`,sMedical);
  }
}