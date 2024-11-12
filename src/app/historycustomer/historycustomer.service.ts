import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorycustomerService {

  urlScheduleMedical = environment.urlApi +"/schedulemedical";
  urlExamMedical = environment.urlApi+ "/medicalExam";

  constructor(private http:HttpClient) { }

  getListHistory(sMedical:any):Observable<any>{
    let httpParams = new HttpParams().append('page',sMedical.page).append('date',sMedical.date);
    return this.http.get(`${this.urlScheduleMedical}/listHistory`,{params:httpParams});
  }

  getDetailCustomer(sExam:any):Observable<any>{
    let httpParams = new HttpParams().append('id',sExam.id);
    return this.http.get(`${this.urlScheduleMedical}/getByIdSchedule`,{params:httpParams});
  }


}
