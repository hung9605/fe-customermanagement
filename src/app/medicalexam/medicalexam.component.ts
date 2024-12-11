import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MedicalService } from './medical.service';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { onlyLettersValidator } from '../validate/custom-validator';

@Component({
  selector: 'app-medicalexam',
  templateUrl: './medicalexam.component.html',
  styleUrl: './medicalexam.component.scss'
})
export class MedicalexamComponent implements OnInit, OnDestroy{

  sMedicalExamForm!: FormGroup;
  dataDialog!: any;
  isReadOnly = true;
  isUpdate = false;
  constructor(private dialogConfig:DynamicDialogConfig,
              private medicalServie:MedicalService,
              private ref:DynamicDialogRef,
              private messageService:MessageService,
              private router: Router){
  }

  ngOnInit(): void {
    this.dataDialog = this.dialogConfig.data;
    console.log('data exam', this.dataDialog);
    
    this.sMedicalExamForm = new FormGroup({
      id: new FormControl(this.dataDialog.idexam),
      fullName: new FormControl(this.dataDialog.fullName),
      timeRegister: new FormControl(this.dataDialog.timeRegister),
      status: new FormControl(this.dataDialog.status),
      sympton: new FormControl(this.dataDialog.sympton,[Validators.required]),
      typeOfMedicine: new FormControl(this.dataDialog.typeOfMedicine,[Validators.required]),
      medicalExaminationDay: new FormControl(this.dataDialog.dateRegister),
    });
    this.isReadOnly = this.dataDialog.isReadOnly;
    this.isUpdate = this.dataDialog.isUpdate;
  }


  ngOnDestroy(): void {
    this.isReadOnly = true;
  }

  save(){
    if(this.sMedicalExamForm.valid){
    let medicalExam = {
      id:this.f['id'].value==null?0:this.f['id'].value,
      fullName: this.f['fullName'].value,
      status: 1,
      sympton: this.f['sympton'].value,
      typeOfMedicine: this.f['typeOfMedicine'].value,
      medicalExaminationDay: this.f['medicalExaminationDay'].value,
      medical:{
        id:this.dataDialog.idSchedule
      }
    }
    console.log('medicalExam', medicalExam);
    
     this.medicalServie.addMedicalExam(medicalExam).subscribe({
       next: data => {
         this.messageService.add({severity:'success', summary:'Success',detail:'Save successfully ' + data.data.fullName});
         setTimeout(() => {
           this.ref.close();
            this.router.navigateByUrl('/',{skipLocationChange:true}).then(() =>{
              this.router.navigate(['/listregister']);
            })
         },500);
       }
     })
  }else{
    this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Field not blank!'});
  }
  }

  close(){
    this.ref.close();
  }

  get f(){return this.sMedicalExamForm.controls;}

  edit(){
    this.isReadOnly = false;
  }


}
