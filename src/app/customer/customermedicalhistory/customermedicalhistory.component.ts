import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../customer.service';
import HistoryDto from './historyDto';
import { environment } from '../../../environments/environment';
import { HistorycustomerService } from '../../historycustomer/historycustomer.service';
import { Medicalexamv1Component } from '../../medicalexamv1/medicalexamv1.component';
import { Subject, takeUntil } from 'rxjs';
import CommonConstant, { TITLE } from '../../common/constants/CommonConstant';
import { Message } from '../../common/constants/Message';

@Component({
  selector: 'app-customermedicalhistory',
  templateUrl: './customermedicalhistory.component.html',
  styleUrl: './customermedicalhistory.component.scss'
})
export class CustomermedicalhistoryComponent implements OnInit,OnDestroy{
  
      customerForm !: FormGroup;
      dataDialog!: any;
      isReadOnly = true;
      isUpdate = true;
      birthday!: Date;
      name !: string;
      phoneNumber !: string;
      address !: string;
      status !: boolean;
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

      constructor(private dialogConfig:DynamicDialogConfig,
                    private customerservice:CustomerService,
                    private ref:DynamicDialogRef,
                    private messageService:MessageService,
                    private dialogService: DialogService,
                    private historyService: HistorycustomerService
        ){}
      
        ngOnInit(): void {
          this.isUpdate = true;
          this.dataDialog = this.dialogConfig.data;
          const { id, fullName, phoneNumber, address, status, dateOfBirth } = this.dataDialog;
          this.name = fullName;
          this.phoneNumber = phoneNumber;
          this.address = address;
          this.status = status === '0';
          this.birthday = new Date(dateOfBirth);
          const customer = {id}
          this.customerservice.getHistoryCustomer(customer).pipe(takeUntil(this.destroy$)).subscribe({
            next: data => {this.historyList = data.data;}
           ,error: err => {}
          })
        }
        ngOnDestroy(): void {
          this.destroy$.next();
          this.destroy$.complete();
        }

        close(){
          this.ref.close();
        }

        show(obj: any){
                this.historyService.getDetailCustomer(obj).subscribe({
                  next: ({data}) => {
                    console.log('datadatadata',data);
                    
                    if(!data){
                      this.messageService.add({severity:CommonConstant.INFO, summary:CommonConstant.INFO_TITLE,detail:Message.WARNING.NO_EXAM});
                      return;
                    }

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
                      medical,
                      finalOpinion
                    } = data;

                    Object.assign(obj, {
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
                      timeActual,
                      finalOpinion
                    });
              
                    this.ref = this.dialogService.open(Medicalexamv1Component,{
                      header:TITLE.EXAM.TITLE,
                      width: TITLE.EXAM.WIDTH,
                      data: obj,
                      showHeader: false
                    });
                  }
                    
                  
                  
                })
              }
}