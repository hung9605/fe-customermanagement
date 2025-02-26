import { HttpClient, HttpParams } from '@angular/common/http';
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

  list(sMedical: any):Observable<any>{
    let httpParams = new HttpParams().append('page',sMedical.page);
    return this.http.get(`${this.urlSupplies}/list`,{params:httpParams});
  }

  getData() {
    return [
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
            alt: 'Description for Image 3',
            title: 'Title 3'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
            alt: 'Description for Image 4',
            title: 'Title 4'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
            alt: 'Description for Image 5',
            title: 'Title 5'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
            alt: 'Description for Image 6',
            title: 'Title 6'
        }
    ];
  }

  getImages() {
      return Promise.resolve(this.getData());
  }
}
