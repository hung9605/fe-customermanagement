import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  urlCustomer: String = environment.urlApi + '/customer';
  urlSchedule: String = environment.urlApi + '/schedulemedical';

  constructor(private http: HttpClient) { }

  getList(page: number):Observable<any>{
    let httpParams = new HttpParams().append('page',page);
    return this.http.get(`${this.urlCustomer}/listcustomer`,{params:httpParams});
  }

  updateCustomer(customer:any):Observable<any>{
    return this.http.post(`${this.urlCustomer}/update`,customer);
  }

  getHistoryCustomer(customer:any):Observable<any>{
    return this.http.post(`${this.urlSchedule}/listhistory`,customer);
  }
    
}