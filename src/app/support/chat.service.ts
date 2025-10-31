import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiConstants } from '../common/constants/ApiConstant';
import { HttpClient } from '@angular/common/http';
import ApiResponse from '../common/api/Respone';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly urlSupport = ApiConstants.URL_CHAT;


  constructor(private http: HttpClient) {
    const now = new Date().toISOString();
  }

  getListUser(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.urlSupport}/user/list`);
  }

  getMessage(user: string,page: number): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.urlSupport}/chat/getMessageByCustomer/${user}/${page}`);
  }


}