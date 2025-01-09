import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  urlAdmin= environment.urlApi+ "/admin";
  

  constructor(private http:HttpClient) { }


  authenticate(sUser:any):Observable<any>{
   return this.http.post(`${this.urlAdmin}/auth`,sUser);
  }
}
