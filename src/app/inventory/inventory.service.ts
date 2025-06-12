import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MedicalSupply } from './medical-supply';
import { ApiConstants } from '../common/constants/ApiConstant';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class InventoryService {

    private readonly urlInventory = ApiConstants.URL_INVENTORY;
    private readonly urlSupplies = ApiConstants.URL_SUPPLIES;

    constructor(private http:HttpClient) { }

    getInventoryData():Observable<any>{
      let httpParams = new HttpParams();
      return this.http.get(`${this.urlInventory}/list`,{params:httpParams});
    }
 
}
