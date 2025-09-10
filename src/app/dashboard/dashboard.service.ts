import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../common/constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly urlSchedule = ApiConstants.URL_SCHEDULE_MEDICAL;
  readonly urlCustomer = ApiConstants.URL_CUSTOMER;

  constructor(private http: HttpClient) { }

  getExam():Observable<any>{
        return this.http.get(`${this.urlSchedule}/getDataExamDashBoard`);
  }

  getAccount():Observable<any>{
        return this.http.get(`${this.urlCustomer}/getDataAccountDashBoard`);
  }
}
