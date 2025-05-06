import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScheduleserviceService } from './scheduleservice.service';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../register/customerservice.service';
import { CustomerService as CustomerHisService } from '../customer/customer.service';
import { Medicalexamv1Component } from '../medicalexamv1/medicalexamv1.component';
import { environment } from '../../environments/environment';
import HistoryDto from '../customer/customermedicalhistory/historyDto';
import { HistorycustomerService } from '../historycustomer/historycustomer.service';

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
  row = environment.rowPanigator;
  historyList!: HistoryDto[];
  srcImage = environment.SRC_IMAGE;
  columnTitles = [
    {title:'STT',style:'w-1'}
    ,{title:'Full Name',style:'w-3'}
    ,{title:'Time Register',style:'w-2'}
    ,{title:'Date Register',style:'w-2'}
    ,{title:'Action',style:'w-2'}
  ];

  constructor(private dialogConfig: DynamicDialogConfig,
              private dialogRef: DynamicDialogRef,
              private dialogService: DialogService,
              private scheduleService: ScheduleserviceService,
              private messageService: MessageService,
              private customerService: CustomerService,
              private historyService: HistorycustomerService,
              private customerservicehis :CustomerHisService
            ){
     
  }

  ngOnInit(): void {
    this.dataDialog = this.dialogConfig.data;
    console.log('dataDialogapp',this.dataDialog);
    this.isEdit = true;
    this.sMedicalForm = new FormGroup({
      fullName: new FormControl(this.dataDialog.fullName),
      timeRegister: new FormControl(this.dataDialog.timeRegister),
      status: new FormControl(this.dataDialog.status),
      dateRegister: new FormControl(this.dataDialog.dateRegister),
      gender: new FormControl(this.dataDialog.gender),
      phoneNumber: new FormControl(this.dataDialog.phoneNumber),
      temperature: new FormControl(this.dataDialog.temperature),
      healthcondition: new FormControl(this.dataDialog.healthcondition)
    });

    this.sMedicalForm.valueChanges.subscribe(() => {
      this.isFormChanged = this.sMedicalForm.dirty; // Kiểm tra form có thay đổi hay không
    });

    let customer = {
      id: this.dataDialog.idSchedule
    }

    this.customerservicehis.getHistoryCustomer(customer).subscribe({
      next: data => {this.historyList = data.data;}
     ,error: err => {}
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
      this.dialogRef.close();
  }

  examination(){
    this.dialogRef.close();
    this.dataDialog.isReadOnly = true;
    this.dataDialog.isUpdate = false;
    this.ref = this.dialogService.open(Medicalexamv1Component,{
      header:'Medical Examination',
      width: '70%',
      data: this.dataDialog,
      showHeader: false
    });
  }

  ngOnDestroy(): void {
    this.visible = false;
  }

  get f(){return this.sMedicalForm.controls;}

  showHistory(obj: any){
    this.historyService.getDetailCustomer(obj).subscribe({
      next: data => {
        if(data.data){
        obj.isReadOnly = true;
        obj.sympton = data.data.sympton;
        obj.typeOfMedicine = data.data.typeOfMedicine;
        obj.idexam = data.data.id;
        obj.idSchedule = data.data.medical.id;
        obj.isUpdate = true;
        obj.money=data.data.money;
        obj.totalMoney = data.data.totalMoney;
        obj.quantity = data.data.quantity;
        obj.createdAt = data.data.createdAt;
        obj.createdBy = data.data.createdBy;
        obj.temperature = data.data.temperature;
        obj.healthCondition = data.data.healthCondition;
        obj.timeActual = data.data.timeActual;
        this.ref = this.dialogService.open(Medicalexamv1Component,{
          header:'Medical Exam',
          width: '70%',
          data: obj,
          showHeader: false
        });
      }else{
        this.messageService.add({severity:'info', summary:'Information',detail:'No examination'});
      }
      }
    })
  }

}
