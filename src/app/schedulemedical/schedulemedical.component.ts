import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MedicalexamComponent } from '../medicalexam/medicalexam.component';

@Component({
  selector: 'app-schedulemedical',
  templateUrl: './schedulemedical.component.html',
  styleUrl: './schedulemedical.component.scss'
})
export class SchedulemedicalComponent implements OnInit, OnDestroy{

  visible = false;
  isReadonly = true;
  sMedicalFrom !: FormGroup;
  ref !: DynamicDialogRef;
  dataDialog !: any;

  constructor(private dialogConfig:DynamicDialogConfig,
              private dialogRef: DynamicDialogRef,
              private dialogService:DialogService
  ){

  }

  ngOnInit(): void {

    this.dataDialog = this.dialogConfig.data;
    this.sMedicalFrom = new FormGroup({
      fullName: new FormControl(this.dataDialog.fullName),
      timeRegister: new FormControl(this.dataDialog.timeRegister),
      status: new FormControl(this.dataDialog.status),
      medicalExaminationDay: new FormControl(this.dataDialog.medicalExaminationDay)
    });
    
  }

  edit(){
    this.isReadonly = false;
    this.visible = true;
  }

  saveEdit(){

  }

  cancel(){
    this.visible = false;
    this.isReadonly = true;
    this.ngOnInit();
  }

  examination(){
    this.dialogRef.close();
    this.ref = this.dialogService.open(MedicalexamComponent,{
      header: 'Medical Examination',
      width: '100vh',
      data: this.dataDialog
    });
  }

  ngOnDestroy(): void {
    this.visible = false;
  }

}
