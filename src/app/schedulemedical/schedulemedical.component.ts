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
import CommonConstant, { TITLE } from '../common/constants/CommonConstant';

import { Subject, takeUntil } from 'rxjs';
import { Message } from '../common/constants/Message';

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
  readonly columnTitles = [
     {title:'STT',style:'w-1'}
    ,{title:'Full Name',style:'w-3'}
    ,{title:'Time Register',style:'w-2'}
    ,{title:'Date Register',style:'w-2'}
    ,{title:'Action',style:'w-2'}
  ];
  private destroy$ = new Subject<void>();

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
    console.log('this.dataDialog',this.dataDialog)
    this.initForm();
    this.sMedicalForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isFormChanged = this.sMedicalForm.dirty;
    });
    const customer = { id: this.dataDialog.idSchedule };
    this.customerservicehis.getHistoryCustomer(customer).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => this.historyList = res?.data || [],
      error: err => console.error(err)
    });
  }

  private initForm(): void {
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
  }

  get f(){return this.sMedicalForm.controls;}

  edit(){
    this.isReadOnly = false;
    this.visible = true;
    this.isEdit = false;
  }

  saveEdit(){

    if (!this.isFormChanged) {
      this.messageService.add({
        severity: CommonConstant.ERROR,
        summary: CommonConstant.ERROR_TITLE,
        detail: Message.VALIDATION.DATA_NOT_CHANGE
      });
      return;
    }

    const sMedical = {
      fullName: this.f['fullName'].value,
      timeRegister: this.f['timeRegister'].value,
      id: this.dataDialog.id
    };

    this.scheduleService.updateScheduleMedical(sMedical).pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        this.messageService.add({severity:CommonConstant.SUCCESS,summary:CommonConstant.SUCCESS_TITLE,detail:Message.SUCCESS.UPDATE});
          if(this.f['fullName']?.dirty){
            console.log('-- processing update account');
            this.updateCustomerName(this.f['fullName'].value);
            
          }
        this.closeDialogWithDelay(500);
      
      },
      error: err => {
        console.error('Update failed:', err);
      }
    })

  }

  private closeDialogWithDelay(delayMs: number): void {
    setTimeout(() => {
      this.customerService.closeDialog();
      this.dialogRef.close();
    }, delayMs);
  }
  

  private updateCustomerName(fullName: string): void {
    const arrName = fullName.split(" ");
    if (!arrName?.length) return;

    const [firstName, ...rest] = arrName;
    const lastName = rest.pop() || '';
    const midName = rest.join(' ');
    const sCustomer = {
      firstName,
      lastName,
      midName,
      id: this.dataDialog.customer.id
    };

    this.scheduleService.updateNameCustomer(sCustomer).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.log('Customer name updated'),
      error: err => console.error('Error updating customer', err)
    });
  }

  cancel(){  
      this.dialogRef.close();
  }

  examination(){
    this.dialogRef.close();
    this.dataDialog.isReadOnly = true;
    this.dataDialog.isUpdate = false;
    this.ref = this.dialogService.open(Medicalexamv1Component,{
      header: TITLE.EXAM.TITLE,
      width : TITLE.EXAM.WIDTH,
      data  : this.dataDialog,
      showHeader: false
    });
  }

  ngOnDestroy(): void {
    this.visible = false;
    this.destroy$.next();
    this.destroy$.complete();
  }

  

  showHistory(obj: any){
    this.historyService.getDetailCustomer(obj).pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        if(data?.data){
            const {
              sympton,
              typeOfMedicine,
              id,
              money,
              totalMoney,
              quantity,
              createdAt,
              createdBy,
              temperature,
              healthCondition,
              timeActual,
              medical
            } = data;
          
            const obj = {
              isReadOnly: true,
              sympton,
              typeOfMedicine,
              idexam: id,
              idSchedule: medical?.id,
              isUpdate: true,
              money,
              totalMoney,
              quantity,
              createdAt,
              createdBy,
              temperature,
              healthCondition,
              timeActual
            };
        this.ref = this.dialogService.open(Medicalexamv1Component,{
          header:TITLE.EXAM.TITLE,
          width : TITLE.EXAM.WIDTH,
          data: obj,
          showHeader: false
        });
      }else{
        this.messageService.add({severity:CommonConstant.INFO, summary:CommonConstant.INFO_TITLE,detail:Message.WARNING.NO_EXAM});
      }
      }
    })
  }

}
