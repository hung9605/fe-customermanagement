import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../customer.service';
import HistoryDto from './historyDto';
import { environment } from '../../../environments/environment';
import { HistorycustomerService } from '../../historycustomer/historycustomer.service';
import { Medicalexamv1Component } from '../../medicalexamv1/medicalexamv1.component';

@Component({
  selector: 'app-customermedicalhistory',
  templateUrl: './customermedicalhistory.component.html',
  styleUrl: './customermedicalhistory.component.scss'
})
export class CustomermedicalhistoryComponent implements OnInit{
  
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

      columnTitles = [
        {title:'STT',style:'w-1'}
        ,{title:'Full Name',style:'w-3'}
        ,{title:'Time Register',style:'w-2'}
        ,{title:'Date Register',style:'w-2'}
        ,{title:'Action',style:'w-2'}
      ];

      constructor(private dialogConfig:DynamicDialogConfig,
                    private customerservice:CustomerService,
                    private ref:DynamicDialogRef,
                    private messageService:MessageService,
                    private router: Router,
                    private dialogService: DialogService,
                    private historyService: HistorycustomerService
        ){}
      
        ngOnInit(): void {
          this.isUpdate = true;
          this.dataDialog = this.dialogConfig.data;
          console.log(' this.dataDialog',  this.dataDialog);
          this.name = this.dataDialog.fullName;
          this.phoneNumber = this.dataDialog.phoneNumber;
          this.address = this.dataDialog.address;
          this.status = this.dataDialog.status == '0' ? true: false;
          this.birthday = new Date(this.dataDialog.dateOfBirth);
          let customer = {
            id: this.dataDialog.id
          }
          this.customerservice.getHistoryCustomer(customer).subscribe({
            next: data => {this.historyList = data.data;}
           ,error: err => {}
          })
        }

        close(){
          this.ref.close();
        }

        show(obj: any){
                this.historyService.getDetailCustomer(obj).subscribe({
                  next: data => {
                    if(data.data){
                      console.log('dta', data.data);
                      
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