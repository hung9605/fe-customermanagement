import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupppliesService {
  url = environment.urlApi +"/upload";
  

  constructor(private http: HttpClient) { }

  upload(file : any):Observable<any>{

    // Gửi tệp lên backend bằng HTTP (sử dụng HttpClient)
    const formData = new FormData();
    formData.append('file', file, file.name);
      return this.http.post(`${this.url}/file`,formData);
    }
}
