import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  urlMoney = environment.urlApi+ "/medicalexam";
  urlPrescription = environment.urlApi+ "/prescription";
  constructor(private http:HttpClient) { }


  getList(sMoney:any):Observable<any>{
    let httpParams = new HttpParams().append('page',sMoney.page).append('date',sMoney.date).append('toDate',sMoney.toDate);
    return this.http.get(`${this.urlMoney}/list`,{params:httpParams});
  }

  getListSupplies(sExam:any):Observable<any>{
    return this.http.post(`${this.urlPrescription}/listsupplies`,sExam);
  }



}
