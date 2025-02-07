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
    
  }

  edit(){
    this.isReadOnly = false;
    this.visible = true;
    this.isEdit = false;
  }

  saveEdit(){
    let sMedical = {
      fullName: this.f['fullName'].value,
      timeRegister: this.f['timeRegister'].value,
      dateRegister: this.f['dateRegister'].value,
      id: this.dataDialog.id
     }
    this.scheduleService.updateScheduleMedical(sMedical).subscribe({
    next: data => {
      this.messageService.add({severity:'success',summary:'success',detail:'Update SuccessFull'});
      setTimeout(() =>{
        this.customerService.closeDialog();
        this.dialogRef.close();
      },500)
     
    },
    error: err => {
      console.log(err);
      
    }
    })
    

  }

  cancel(){
    this.visible = false;
    this.isReadOnly = true;
    this.ngOnInit();
  }

  examination(){
    this.dialogRef.close();
    this.dataDialog.isReadOnly = true;
    console.log('this.dataDialog',this.dataDialog);
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
