import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorycustomerService {

  private readonly urlScheduleMedical = environment.urlApi +"/schedulemedical";
  private readonly urlExamMedical = environment.urlApi+ "/medicalexam";

  constructor(private http:HttpClient) { }

  getListHistory(sMedical:any):Observable<any>{
    let httpParams = new HttpParams().set('page',sMedical.page).set('date',sMedical.date).set('toDate',sMedical.toDate);
    return this.http.get(`${this.urlScheduleMedical}/listhistory`,{params:httpParams});
  }

  getDetailCustomer(sExam:any):Observable<any>{
    let httpParams = new HttpParams().set('id',sExam.id);
    return this.http.get(`${this.urlExamMedical}/getbyidschedule`,{params:httpParams});
  }

  getListHistoryExport(sMedical:any):Observable<any>{
    let httpParams = new HttpParams().set('page',sMedical.page).set('date',sMedical.date).set('toDate',sMedical.toDate);
    return this.http.get(`${this.urlScheduleMedical}/listhistoryexport`,{params:httpParams});
  }


}
