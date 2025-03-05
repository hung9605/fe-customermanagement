import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupppliesService } from '../suppplies.service';
import MedicalSupplies from '../MedicalSupplies';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-formsupplies',
  templateUrl: './formsupplies.component.html',
  styleUrl: './formsupplies.component.scss'
})
export class FormsuppliesComponent implements OnInit {

  file: any;
  fileThumbnail!: any[];
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  @ViewChild('fileUploadThumbnail') fileUploadThumbnail!: FileUpload;
  
  suppliesForm !: FormGroup;
  constructor(private suppliesService: SupppliesService
              ,private messageService:MessageService
  ){}

  
  ngOnInit(): void {
    this.suppliesForm = new FormGroup({
      medicineName: new FormControl('',Validators.required),
      quantity: new FormControl('1',Validators.required),
      unitPrice: new FormControl('0', Validators.required),
      description: new FormControl('')
    });
  }

  addsupplies(){
    let medicalSupplies: MedicalSupplies = {
      id:0,
      medicineName: this.f['medicineName'].value,
      quantity: this.f['quantity'].value,
      unitPrice: this.f['unitPrice'].value,
      link: this.file.name,
      description: this.f['description'].value
    }
    this.suppliesService.add(medicalSupplies).subscribe({
      next: data => {
        console.log(data);
        let folderName = data.data.id;
        this.suppliesService.upload(this.file,folderName).subscribe({
          next: response => {
            console.log('Tệp đã được tải lên thành công:', response);
          },
          error: err => {
            console.error('Lỗi khi tải tệp lên:', err);
          }
        });

        this.suppliesService.uploadFiles(this.fileThumbnail,folderName).subscribe({
          next: response => {
            console.log('Tệp đã được tải lên thành công:', response);
          },
          error: err => {
            console.error('Lỗi khi tải tệp lên:', err);
          }
        });

        this.suppliesForm.reset();
        this.fileUpload.clear();
        this.fileUploadThumbnail.clear();
        this.messageService.add({severity: 'success', summary: 'Thêm Supplies thành công'});
        
      }
    });
  }

  onUpload(e: any){
    this.file = e.files[0];
  }
  onUploadThumbnail(e: any){
      this.fileThumbnail = e.currentFiles;
  }

  get f(){return this.suppliesForm.controls};


}
