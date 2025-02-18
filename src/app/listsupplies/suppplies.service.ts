import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import MedicalSupplies from './MedicalSupplies';

@Injectable({
  providedIn: 'root'
})
export class SupppliesService {
  urlUpload = environment.urlApi +"/upload";
  urlSupplies = environment.urlApi + "/medicalsupplies";

  constructor(private http: HttpClient) { }

  upload(file : any):Observable<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.urlUpload}/file`,formData);
  }

  add(medicalSupplies: MedicalSupplies): Observable<any>{
    return this.http.post(`${this.urlSupplies}/add`,medicalSupplies);
  }
}
