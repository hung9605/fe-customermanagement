import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  urlCustomer = environment.urlApi + "/customer";
  urlScheduleMedical = environment.urlApi + "/schedulemedical";

  constructor(private http: HttpClient) { }

  addCustomer(customer:any): Observable<any>{
      return this.http.post(`${this.urlCustomer}/add`,customer);
  }

  addScheduleMedical(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlScheduleMedical}/add`,sMedical);
  }
}
