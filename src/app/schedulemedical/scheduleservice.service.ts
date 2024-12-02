import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleserviceService {

  urlScheduleMedical = environment.urlApi + "/schedulemedical";

  constructor(private http:HttpClient) { }

  updateScheduleMedical(sMedical: any): Observable<any>{
    return this.http.post(`${this.urlScheduleMedical}/update`,sMedical);
  }
}
