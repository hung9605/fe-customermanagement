import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScheduleserviceService } from './scheduleservice.service';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../register/customerservice.service';
import { Medicalexamv1Component } from '../medicalexamv1/medicalexamv1.component';

@Component({
  selector: 'app-schedulemedical',
  templateUrl: './schedulemedical.component.html',
  styleUrl: './schedulemedical.component.scss'
})
export class SchedulemedicalComponent implements OnInit, OnDestroy{

  visible = false;
  isReadOnly = true;
  sMedicalForm !: FormGroup;
  ref !: DynamicDialogRef;
  dataDialog !: any;
  isEdit = true;
  isFormChanged: any;

  constructor(private dialogConfig: DynamicDialogConfig,
              private dialogRef: DynamicDialogRef,
              private dialogService: DialogService,
              private scheduleService: ScheduleserviceService,
              private messageService: MessageService,
              private customerService: CustomerService){
     
  }

  ngOnInit(): void {
    this.dataDialog = this.dialogConfig.data;
    console.log('dataDialog',this.dataDialog);
    this.isEdit = true;
    this.sMedicalForm = new FormGroup({
      fullName: new FormControl(this.dataDialog.fullName),
      timeRegister: new FormControl(this.dataDialog.timeRegister),
      status: new FormControl(this.dataDialog.status),
      dateRegister: new FormControl(this.dataDialog.dateRegister)
    });

    this.sMedicalForm.valueChanges.subscribe(() => {
      this.isFormChanged = this.sMedicalForm.dirty; // Kiểm tra form có thay đổi hay không
    });
    
  }

  edit(){
    this.isReadOnly = false;
    this.visible = true;
    this.isEdit = false;
  }

  saveEdit(){
    console.log(this.sMedicalForm);
    
    let sMedical = {
      fullName: this.f['fullName'].value,
      timeRegister: this.f['timeRegister'].value,
      id: this.dataDialog.id
     }
     if(this.isFormChanged){
    this.scheduleService.updateScheduleMedical(sMedical).subscribe({
    next: data => {
      this.messageService.add({severity:'success',summary:'success',detail:'Update SuccessFull'});
        if(this.f['fullName']?.dirty){
          console.log('-- processing update account');
          const fullName = this.f['fullName'].value;
          const arrName=fullName?.split(" ");
          let firstName = "";
          let midName = "";
          let lastName = "";
        
          if(null != arrName){
            firstName = arrName[0];
            lastName = arrName[arrName.length - 1];
            for(let i = 1; i < arrName.length-1; i++){
              midName += arrName[i] +" ";
            }

            let sCustomer = {
              firstName: firstName,
              midName: midName,
              lastName: lastName,
              id: this.dataDialog.idSchedule
            }
            this.scheduleService.updateNameCustomer(sCustomer).subscribe({
              next: data => {
                console.log('Update Customer successfully!');
                
              },
              error: err => {
                console.log('Update Customer error',err);
                
              }
            })
          }
          
        }
      setTimeout(() =>{
        this.customerService.closeDialog();
        this.dialogRef.close();
      },500)
     
    },
    error: err => {
      console.log(err);
      
    }
    })
  }else{
    this.messageService.add({severity:'error',summary:'error',detail:'Data not change!'});
  }
    

  }

  cancel(){
    this.visible = false;
    this.isReadOnly = true;
    this.ngOnInit();
  }

  examination(){
    this.dialogRef.close();
    this.dataDialog.isReadOnly = true;
    this.dataDialog.isUpdate = false;
    this.ref = this.dialogService.open(Medicalexamv1Component,{
      header: 'Medical Examination',
      width: '100vh',
      data: this.dataDialog
    });
  }

  ngOnDestroy(): void {
    this.visible = false;
  }

  get f(){return this.sMedicalForm.controls;}

}
