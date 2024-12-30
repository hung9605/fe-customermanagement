import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  urlMoney = environment.urlApi+ "/medicalexam";

  constructor(private http:HttpClient) { }


  getList(sMoney:any):Observable<any>{
    let httpParams = new HttpParams().append('page',sMoney.page).append('date',sMoney.date);
    return this.http.get(`${this.urlMoney}/list`,{params:httpParams});
  }


}
