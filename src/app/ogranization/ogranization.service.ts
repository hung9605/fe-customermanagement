import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiConstants } from '../common/constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OgranizationService {

  private readonly urlOgranization = ApiConstants.URL_OGRANIZATION;

  constructor(private http:HttpClient) { }

  getList():Observable<any>{
      return this.http.get(`${this.urlOgranization}/list`,{});
  }
  
}
