import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly urlCustomer = ApiConstants.URL_CUSTOMER;
  private readonly urlSchedule = ApiConstants.URL_SCHEDULE_MEDICAL;

  constructor(private http: HttpClient) {}

  getList(page: number):Observable<any>{
    const params = new HttpParams().set('page', page);
    return this.http.get(`${this.urlCustomer}/listcustomer`,{params});
  }

  updateCustomer(customer:any):Observable<any>{
    return this.http.post(`${this.urlCustomer}/update`,customer);
  }

  getHistoryCustomer(customer:any):Observable<any>{
    return this.http.post(`${this.urlSchedule}/listhistory`,customer);
  }


  addScheduleMedicalExistsCustomer(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlSchedule}/addexistscustomer`,sMedical);
  }
    
}