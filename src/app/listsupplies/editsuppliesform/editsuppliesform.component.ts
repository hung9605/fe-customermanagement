import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupppliesService } from '../suppplies.service';
import { environment } from '../../../environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

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
  file: any;
  fileThumbnail!: any[] ;
  srcImage = environment.SRC_IMAGE;
  constructor(private dialogConfig: DynamicDialogConfig
             ,private suppliesService: SupppliesService
             ,private ref:DynamicDialogRef
             ,private messageService: MessageService
             ,private confirmationService: ConfirmationService
  ){
   this.fileThumbnail = [];
  }

  ngOnInit(): void {
    this.dataDialog = this.dialogConfig.data;
    this.suppliesForm = new FormGroup({
      id: new FormControl(this.dataDialog.id),
      medicineName: new FormControl(this.dataDialog.medicineName,Validators.required),
      quantity: new FormControl(this.dataDialog.quantity,Validators.required),
      unitPrice: new FormControl(this.dataDialog.unitPrice, Validators.required),
      description: new FormControl(this.dataDialog.description)
    });
    this.thumbnailRemove = [];
    let idSupplies = this.dataDialog.id;
    this.suppliesService.getDetailSupplies(idSupplies).subscribe({
      next: data => {
        this.suppliesForm.controls['description'].setValue(data.data.description);
      },
      error: err => {console.log(err)}
    });
    
    this.suppliesService.getImages(idSupplies).subscribe({
      next: data => {this.images = data.data},
      error: err => {console.log(err);
      }
    })
  }
  save(){
    if(!this.suppliesForm.pristine){
      let objUpdate = this.getPristineValues();
      objUpdate['id'] = this.dataDialog.id;
      this.suppliesService.updateSupplies(objUpdate).subscribe({
        next: data => {
        },
        error: err =>{console.log(err);
        }
      })
    }
    if(this.thumbnailRemove.length > 0){
      this.suppliesService.removeImage(this.thumbnailRemove).subscribe({
        next: data => {}
       ,error: err => {}
      });
      this.suppliesService.removeFile(this.thumbnailRemove).subscribe({
        next: data => {}
       ,error: err => {}
      });     
    }  

    if(this.file != null){
    this.suppliesService.upload(this.file,this.suppliesForm.controls['id'].value).subscribe({
      next: response => {
        console.log('Tệp đã được tải lên thành công:', response);
        let params = {
          id: this.suppliesForm.controls['id'].value,
          link: this.file.name
        }
        this.suppliesService.updateSupplies(params).subscribe({
          next: data => {console.log("update image successfully!");},
          error: err => {}
        });
      },
      error: err => {
        console.error('Lỗi khi tải tệp lên:', err);
      }
    });
  }
    if(this.fileThumbnail.length > 0){
    this.suppliesService.uploadFiles(this.fileThumbnail,this.suppliesForm.controls['id'].value).subscribe({
      next: response => {
        console.log('Tệp đã được tải lên thành công:', response);
      },
      error: err => {
        console.error('Lỗi khi tải tệp lên:', err);
      }
    });
  }
    this.messageService.add({severity:'success', summary:'Success',detail:'Save successfully'});
  
    setTimeout(() => {
      this.suppliesService.closeDialog();
      this.ref.close();
    },1000);
  }

  close(){
    this.ref.close();
  }

  onUpload(e: any){
    this.file = e.files[0];
    console.log('this.file', this.file);
    
  }
  onUploadThumbnail(e: any){
      this.fileThumbnail = e.currentFiles;
  }

  remove(data: any,index: number){
    this.thumbnailRemove.push(data);
    this.images.splice(index,1);
  }

  delete(){
    let supplies = {
      id: this.suppliesForm.controls['id'].value,
      isDelete: true
    }
    this.suppliesService.deleteSupplies(supplies).subscribe({
      next: data => {
              this.messageService.add({severity:'success',summary:'success',detail:'Deleted successfully!'});
            setTimeout(() => {
              this.suppliesService.closeDialog();
              this.close();
            },1000);
          },
          error: err => {}
    });
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
            this.delete();
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 1500 });
        }
    });
  }

  closeDialog(){

  }

// Lọc các giá trị dirty
getPristineValues() {
  const dirtyValues: { [key: string]: any } = {}; // Định nghĩa kiểu đối tượng

  // Duyệt qua tất cả các control trong FormGroup
  Object.keys(this.suppliesForm.controls).forEach(controlName => {
    const control = this.suppliesForm.get(controlName);

    // Kiểm tra nếu control là dirty (đã thay đổi)
    if (control?.pristine == false) {
      dirtyValues[controlName] = control.value;
    }
  });

  return dirtyValues;
}



}