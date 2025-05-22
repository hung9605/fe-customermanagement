import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class RegisterhistoryService {

  private readonly urlScheduleMedical = ApiConstants.URL_SCHEDULE_MEDICAL;

  constructor(private http: HttpClient) { }


   getListRegister(sMedical: any):Observable<any>{
    let httpParams = new HttpParams().set('page',sMedical.page).set('date',sMedical.date).set('toDate',sMedical.toDate);
      return this.http.get(`${this.urlScheduleMedical}/listhistoryall`,{params:httpParams});
  }
}
