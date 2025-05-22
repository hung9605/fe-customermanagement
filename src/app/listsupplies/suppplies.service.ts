import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import MedicalSupplies from './MedicalSupplies';
import { ApiConstants } from '../common/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class SupppliesService {
  private readonly urlUpload = ApiConstants.URL_UPLOAD;
  private readonly urlSupplies = ApiConstants.URL_SUPPLIES;
  private readonly urlImage = ApiConstants.URL_IMAGE;

  constructor(private http: HttpClient) { }

  upload(file : any, folderName: string):Observable<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    // Thêm tham số foldername vào formData
    formData.append('foldername', folderName);
    return this.http.post(`${this.urlUpload}/file`,formData);
  }

  uploadFiles(files: File[],folderName: string): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    formData.append('foldername', folderName);
    return this.http.post(`${this.urlUpload}/files`, formData);
  }

  add(medicalSupplies: MedicalSupplies): Observable<any>{
    return this.http.post(`${this.urlSupplies}/add`,medicalSupplies);
  }

  list(sMedical: any): Observable<any>{
    let httpParams = new HttpParams().append('page',sMedical.page);
    return this.http.get(`${this.urlSupplies}/list`,{params:httpParams});
  }

  getImages(idSupplies: any): Observable<any>{
    let httpParams = new HttpParams().append('suppliesId',idSupplies);
    return this.http.get(`${this.urlImage}/list`,{params:httpParams});
  }

  removeImage(image: any): Observable<any> {
    return this.http.post(`${this.urlImage}/remove`,image);
  }
  removeFile(image: any): Observable<any> {
    return this.http.post(`${this.urlUpload}/remove`,image);
  }

  deleteSupplies(supplies: any): Observable<any>{
    return this.http.post(`${this.urlSupplies}/delete`,supplies);
  }
  getDetailSupplies(suppliesId: Number): Observable<any>{
    return this.http.get(`${this.urlSupplies}/detail/${suppliesId}`);
  }

  updateSupplies(suppliesDetail: any): Observable<any>{
    return this.http.post(`${this.urlSupplies}/updatedetail`,suppliesDetail);
  }

  private _listener = new Subject();
  listen() : Observable<any>{
    return this._listener.asObservable();
  }
  closeDialog(){
    this._listener.next("closed");
  }
}