import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  urlMedical = environment.urlApi + "/medicalexam";
  urlMedicalSupplies = environment.urlApi + "/medicalsupplies"
  urlPrescription = environment.urlApi + "/prescription";

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
