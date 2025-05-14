import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly urlCustomer = environment.urlApi + '/customer';
  private readonly urlSchedule = environment.urlApi + '/schedulemedical';

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