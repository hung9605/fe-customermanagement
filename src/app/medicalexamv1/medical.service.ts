import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  private readonly urlMedical = ApiConstants.URL_EXAM;
  private readonly urlMedicalSupplies = ApiConstants.URL_SUPPLIES;
  private readonly urlPrescription = ApiConstants.URL_PRESCRIPTION;

  constructor(private http:HttpClient) { }

  addMedicalExam(sMedical:any) :Observable<any>{
    return this.http.post(`${this.urlMedical}/add`,sMedical);
  }

  updateMedicalExam(sMedical:any) :Observable<any>{
    return this.http.post(`${this.urlMedical}/update`,sMedical);
  }

  listMedicalSupplies() :Observable<any>{
    return this.http.get(`${this.urlMedicalSupplies}/list`);
  }
  listPrescription(sExam: any): Observable<any>{
    return this.http.post(`${this.urlPrescription}/list`, sExam);
  }
}
