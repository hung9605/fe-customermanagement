import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupppliesService } from '../suppplies.service';
import { environment } from '../../../environments/environment';
import { MedicalService } from '../../medicalexamv1/medical.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-editsuppliesform',
  templateUrl: './editsuppliesform.component.html',
  styleUrl: './editsuppliesform.component.scss'
})
export class EditsuppliesformComponent implements OnInit{

  suppliesForm !: FormGroup;
  dataDialog !: any;
  images !: any[];
  thumbnailRemove !: any[];
  urlImage: string = environment.URL_UPLOAD_IMAGE;

  constructor(private dialogConfig: DynamicDialogConfig
             ,private suppliesService: SupppliesService
             ,private ref:DynamicDialogRef
             ,private messageService: MessageService
             ,private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.thumbnailRemove = [];
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
    console.log('this.thumbnailRemove', this.thumbnailRemove);
    
    if(this.thumbnailRemove.length > 0){
      this.suppliesService.removeImage(this.thumbnailRemove).subscribe({
        next: data => {}
       ,error: err => {}
      });
      this.suppliesService.removeFile(this.thumbnailRemove).subscribe({
        next: data => {}
       ,error: err => {}
      })
    }

    
    this.messageService.add({severity:'success', summary:'Success',detail:'Save successfully'});

  }

  close(){
    this.ref.close();
  }

  onUpload(event: any){

  }

  onUploadThumbnail(event: any){

  }

  remove(data: any,index: number){
    this.thumbnailRemove.push(data);
    console.log('dataaa',this.thumbnailRemove);
    this.images.splice(index,1);
    
    // this.suppliesService.removeImage(data).subscribe({
    //   next: data => {

    //   },
    //   error: err =>{
    //     console.log(err);
    //   }
    // });
  }

  removeImage(){
    
  }

  delete(){

  }

confirm() {
    this.confirmationService.confirm({
        header: 'Are you sure',
        message: 'You want to delete it?',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
  }

  closeDialog(){
    
  }
}
