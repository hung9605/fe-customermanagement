import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  urlCustomer = environment.urlApi + "/customer";
  urlScheduleMedical = environment.urlApi + "/schedulemedical";
  urlAdmin = environment.urlApi + "/admin";
  constructor(private http:HttpClient) { }

  addCustomer(customer:any): Observable<any>{
    return this.http.post(`${this.urlCustomer}/add`,customer);
  }

  getCustomer(customer: any):Observable<any>{
    let httpParams = new HttpParams().append('phoneNumber',customer.phoneNumber)
                                     .append('firstName',customer.firstName)
                                     .append('midName',customer.midName)
                                     .append('lastName',customer.lastName);
    return this.http.get(`${this.urlCustomer}/checkcustomer`,{params:httpParams});
  }

  addScheduleMedical(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlScheduleMedical}/add`,sMedical);
  }

  addScheduleMedicalExistsCustomer(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlScheduleMedical}/addexistscustomer`,sMedical);
  }

  getListRegister(sMedical: any):Observable<any>{
    let httpParams = new HttpParams().append('page',sMedical.page);
    return this.http.get(`${this.urlScheduleMedical}/listregister`,{params:httpParams});
  }

  getTime():Observable<any>{
    return this.http.get(`${this.urlAdmin}/gettime`,{});
  }

  checktimeRegister(time: string):Observable<any>{
    let httpParams = new HttpParams().append('time',time);
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
