import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleserviceService {

  urlScheduleMedical = environment.urlApi + "/schedulemedical";
  urlAccount = environment.urlApi + "/customer"

  constructor(private http:HttpClient) { }

  updateScheduleMedical(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlScheduleMedical}/update`,sMedical);
  }

  updateNameCustomer(sCustomer: any): Observable<any>{
    return this.http.post(`${this.urlAccount}/updatename`,sCustomer);
  }
}
