import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SupppliesService } from '../suppplies.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-editsuppliesform',
  templateUrl: './editsuppliesform.component.html',
  styleUrl: './editsuppliesform.component.scss'
})
export class EditsuppliesformComponent implements OnInit{

  suppliesForm !: FormGroup;
  dataDialog !: any;
  images !: any[];
  urlImage: string = environment.URL_UPLOAD_IMAGE;

  constructor(private dialogConfig: DynamicDialogConfig
             ,private suppliesService: SupppliesService
  ){}

  ngOnInit(): void {
    this.dataDialog = this.dialogConfig.data;
    console.log('this.datalog', this.dataDialog);
    
    this.suppliesService.getImages(this.dataDialog.id).subscribe({
      next: data => {this.images = data.data},
      error: err => {console.log(err);
      }
    })
    this.suppliesForm = new FormGroup({
          id: new FormControl(this.dataDialog.id),
          medicineName: new FormControl(this.dataDialog.medicineName,Validators.required),
          quantity: new FormControl(this.dataDialog.quantity,Validators.required),
          unitPrice: new FormControl(this.dataDialog.unitPrice, Validators.required),
          description: new FormControl(this.dataDialog.description)
    });
    
  }

  save(){

  }

  close(){

  }

  onUpload(event: any){

  }

  onUploadThumbnail(event: any){

  }

  remove(data: any){
    console.log('dataaa',data);
    
  }

  removeImage(){
    
  }

}
