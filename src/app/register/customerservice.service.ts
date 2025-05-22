import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly urlCustomer = ApiConstants.URL_CUSTOMER;
  private readonly urlScheduleMedical = ApiConstants.URL_SCHEDULE_MEDICAL;
  private readonly urlAdmin = ApiConstants.URL_ADMIN;
  constructor(private http:HttpClient) { }

  addCustomer(customer:any): Observable<any>{
    return this.http.post(`${this.urlCustomer}/add`,customer);
  }

  getCustomer(customer: any):Observable<any>{
    let httpParams = new HttpParams().set('phoneNumber',customer.phoneNumber)
                                     .set('firstName',customer.firstName)
                                     .set('midName',customer.midName)
                                     .set('lastName',customer.lastName);
    return this.http.get(`${this.urlCustomer}/checkcustomer`,{params:httpParams});
  }

  addScheduleMedical(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlScheduleMedical}/add`,sMedical);
  }

  addScheduleMedicalExistsCustomer(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlScheduleMedical}/addexistscustomer`,sMedical);
  }

  getListRegister(sMedical: any):Observable<any>{
    let httpParams = new HttpParams().set('page',sMedical.page);
    return this.http.get(`${this.urlScheduleMedical}/listregister`,{params:httpParams});
  }

  getTime():Observable<any>{
    return this.http.get(`${this.urlAdmin}/gettime`,{});
  }

  checktimeRegister(time: string):Observable<any>{
    let httpParams = new HttpParams().set('time',time);
    return this.http.get(`${this.urlScheduleMedical}/checktime`,{params:httpParams});
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  closeDialog(){
    this._listeners.next("closed");
  }
}
