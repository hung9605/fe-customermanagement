import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  urlMedical = environment.urlApi + "/medicalexam";

  constructor(private http:HttpClient) { }

  addMedicalExam(sMedical:any):Observable<any>{
    return this.http.post(`${this.urlMedical}/add`,sMedical);
  }
}
