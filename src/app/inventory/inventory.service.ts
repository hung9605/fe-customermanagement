import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MedicalSupply } from './medical-supply';
import { ApiConstants } from '../common/constants/ApiConstant';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class InventoryService {

    private readonly urlInventory = ApiConstants.URL_INVENTORY;
    private readonly urlMasterData = ApiConstants.URL_MASTERDATA;
    constructor(private http:HttpClient) { }

    getInventoryData(params: any):Observable<any>{
      let httpParams = new HttpParams()
      .set('fromDate',params.fromDate)
      .set('toDate',params.toDate);
      return this.http.get(`${this.urlInventory}/list`,{params:httpParams});
    }

    getStatusCombo():Observable<any>{
      let httpParams = new HttpParams().set('key','inventory_status');
      return this.http.get(`${this.urlMasterData}/list`,{params:httpParams});
    }

    addInventory(inventory: any):Observable<any>{
      return this.http.post(`${this.urlInventory}/add`,inventory);
    }
    updateInventory(inventory: any):Observable<any>{
      return this.http.post(`${this.urlInventory}/update`,inventory);
    }

    private _listeners = new Subject<any>();
    listen(): Observable<any>{
      return this._listeners.asObservable();
    }
    closeDialog(){
      this._listeners.next("closed");
    }
    
    getInventoryChart(params: any): Observable<any>{
      let httpParams = new HttpParams().set('fromDate',params.fromDate).set('toDate',params.toDate);
      return this.http.get(`${this.urlInventory}/getDataChart`,{params: httpParams});
    }

}