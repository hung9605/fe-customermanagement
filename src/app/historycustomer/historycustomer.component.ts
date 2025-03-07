import { Component, OnDestroy, OnInit } from '@angular/core';
import Customer from '../register/customer';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../register/customerservice.service';
import { HistorycustomerService } from './historycustomer.service';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant from '../common/constants/CommonConstant';
import { environment } from '../../environments/environment';
import { Medicalexamv1Component } from '../medicalexamv1/medicalexamv1.component';

@Component({
  selector: 'app-historycustomer',
  templateUrl: './historycustomer.component.html',
  styleUrl: './historycustomer.component.scss'
})
export class HistorycustomerComponent implements OnInit,OnDestroy {

    sMedicals!: Customer[];
    callData: any;
    ref!: DynamicDialogRef;
    date: any = new Date();
    toDate: any = new Date();
    row = environment.rowPanigator;
    isLoading = true;
    columnTitles = [{title:'STT',style:'w-1'},{title:'Full Name',style:'w-4'},
                    {title:'Time Register',style:'w-3'},{title:'Status',style:'w-2'},{title:'Action',style:'w-3'}];
    constructor(private registerService:CustomerService
                ,private dialogService:DialogService
                ,private historyService:HistorycustomerService
    ){}

      ngOnInit(): void{
        this.isLoading = true;
        const year = this.date.getFullYear();
        const month = String(this.date.getMonth() + 1).padStart(2,'0');
        const day = String(this.date.getDate()).padStart(2,'0');
        let sMedical = {
          page: 0,
          date: StringUtil.formatDate(this.date,'-'),
          toDate: StringUtil.formatDate(this.toDate,'-')
        }
        this.getListHistory(sMedical);
      }

      show(obj: any){
        console.log(obj);
        
        this.historyService.getDetailCustomer(obj).subscribe({
          next: data => {
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
            this.ref = this.dialogService.open(Medicalexamv1Component,{
              header:'Medical Exam',
              width: '60rem',
              data: obj
            })
            
          }
        })
      }

      showHistory(item: any){

      }

      search(){
        this.isLoading = true;
        let sMedical = {
          page: 0,
          date: StringUtil.formatDate(this.date,'-'),
          toDate: StringUtil.formatDate(this.toDate,'-')
        }
        this.getListHistory(sMedical);
      }

      getListHistory(sMedical: any){
        this.historyService.getListHistory(sMedical).subscribe({
          next: data =>{
            this.sMedicals = data.data;
            console.log('this.sMedicals',this.sMedicals);
            
            this.sMedicals.map(item =>{
              item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
              item.status = CommonConstant.EXAMINED;
            });
            setTimeout(() =>{
              this.isLoading = false;
            },500)
          }
        })
      }


      ngOnDestroy(): void {
        
      }


}
