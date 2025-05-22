import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class ScheduleserviceService {

  private readonly urlScheduleMedical = ApiConstants.URL_SCHEDULE_MEDICAL;
  private readonly urlAccount = ApiConstants.URL_CUSTOMER;

  constructor(private http:HttpClient) { }

  updateScheduleMedical(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlScheduleMedical}/update`,sMedical);
  }

  updateNameCustomer(sCustomer: any): Observable<any>{
    return this.http.post(`${this.urlAccount}/updatename`,sCustomer);
  }
}
