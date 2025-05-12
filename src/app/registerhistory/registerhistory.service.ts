import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterhistoryService {

  urlScheduleMedical = environment.urlApi + "/schedulemedical";

  constructor(private http: HttpClient) { }


   getListRegister(sMedical: any):Observable<any>{
    let httpParams = new HttpParams().append('page',sMedical.page).append('date',sMedical.date).append('toDate',sMedical.toDate);
      return this.http.get(`${this.urlScheduleMedical}/listhistoryall`,{params:httpParams});
  }
}
