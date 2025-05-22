import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  private readonly urlMoney = ApiConstants.URL_EXAM;
  private readonly urlPrescription = ApiConstants.URL_PRESCRIPTION;
  constructor(private http:HttpClient) { }


  getList(sMoney:any):Observable<any>{
    let httpParams = new HttpParams().set('page',sMoney.page).set('date',sMoney.date).set('toDate',sMoney.toDate);
    return this.http.get(`${this.urlMoney}/list`,{params:httpParams});
  }

  getListSupplies(sExam:any):Observable<any>{
    return this.http.post(`${this.urlPrescription}/listsupplies`,sExam);
  }

  getListExport(sMoney:any):Observable<any>{
    let httpParams = new HttpParams().set('page',sMoney.page).set('date',sMoney.date).set('toDate',sMoney.toDate);
    return this.http.get(`${this.urlMoney}/listmoneyexport`,{params:httpParams});
  }



}
