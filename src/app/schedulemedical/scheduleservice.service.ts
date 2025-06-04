import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';
import Response from '../common/api/Respone';
import ApiResponse from '../common/api/Respone';

@Injectable({
  providedIn: 'root'
})
export class ScheduleserviceService {

  private readonly urlScheduleMedical = ApiConstants.URL_SCHEDULE_MEDICAL;
  private readonly urlAccount = ApiConstants.URL_CUSTOMER;

  constructor(private http:HttpClient) { }

  updateScheduleMedical(sMedical: any): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.urlScheduleMedical}/update`,sMedical);
  }

  updateNameCustomer(sCustomer: any): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.urlAccount}/updatename`,sCustomer);
  }
}
