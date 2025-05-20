import { Component, OnDestroy, OnInit } from '@angular/core';
import Customer from '../register/customer';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../register/customerservice.service';
import { HistorycustomerService } from './historycustomer.service';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant from '../common/constants/CommonConstant';
import { environment } from '../../environments/environment';
import { Medicalexamv1Component } from '../medicalexamv1/medicalexamv1.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import ExamDetail from './examdetail';
import ExcelUtil from '../common/utils/ExcelUtil';
import CommonUtil from '../common/utils/CommonUtil';
import { SearchMedicalDto } from './SearchMedicalDto';
import { exhaustMap, Subject } from 'rxjs';

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
    lstHistoryExport !: ExamDetail[];
    columnTitles = [{title:'STT',style:'w-1'},{title:'Full Name',style:'w-4'},
                    {title:'Time Register',style:'w-3'},{title:'Status',style:'w-2'},{title:'Action',style:'w-3'}];
              
    constructor(private registerService:CustomerService
                ,private dialogService:DialogService
                ,private historyService:HistorycustomerService
    ){}

      ngOnInit(): void{
        this.isLoading = true;
        let sMedical = {
          page: 0,
          date: StringUtil.formatDate(this.date,'-'),
          toDate: StringUtil.formatDate(this.toDate,'-')
        }
        console.log('sMedical',sMedical);
        
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
            obj.temperature = data.data.temperature;
            obj.healthCondition = data.data.healthCondition;
            obj.createdAt = data.data.createdAt;
            obj.createdBy = data.data.createdBy;
            obj.timeActual = data.data.timeActual;
            this.ref = this.dialogService.open(Medicalexamv1Component,{
              header:'Medical Exam',
              width: '60rem',
              data: obj,
              showHeader: false
            })
            
          }
        })
      }

      showHistory(item: any){

      }

      search(){
        this.isLoading = true;
        let sMedical: SearchMedicalDto  = {
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
            this.sMedicals.map(item =>{
              item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
              item.status = CommonConstant.EXAMINED;
            });
            this.offLoading();
          },
          error: err => {
            console.log(err);
            this.offLoading();
          }
        })
      }

      offLoading(){
        setTimeout(() =>{
          this.isLoading = false;
        },500)
      }

      ngOnDestroy(): void {
        if (this.ref) {
          this.ref.close();
        }
      }

      exportToExcel(){
        if (this.isLoading) return;
        let sMedical:SearchMedicalDto = {
          page: 0,
          date: StringUtil.formatDate(this.date,'-'),
          toDate: StringUtil.formatDate(this.toDate,'-')
        }
        this.isLoading = true;
        this.historyService.getListHistoryExport(sMedical).subscribe({
          next: data =>{
            this.lstHistoryExport = data.data;
            let colCenter = ['dateRegister', 'timeRegister', 'timeActual', 'status'];
            let colRight = ['temperature', 'totalMoney'];
            let columns = [
              { header: 'STT', key: 'index', width: 10 },
              { header: 'Full Name', key: 'fullName', width: 20 },
              { header: 'Date Register', key: 'dateRegister', width: 20 },
              { header: 'Time Register', key: 'timeRegister', width: 15 },
              { header: 'Time Actual', key: 'timeActual', width: 15 },
              { header: 'Status', key: 'status', width: 10},
              { header: 'Temperature', key: 'temperature', width: 20 },
              { header: 'Health Condition', key: 'healthCondition', width: 20 },
              { header: 'Sympton', key: 'sympton', width: 20 },
              { header: 'typeMedicine', key: 'typeMedicine', width: 30 },
              { header: 'Total Money', key: 'totalMoney', width: 15 },
              { header: 'Init Dttm', key: 'createdAt', width: 30 },
              { header: 'Init By', key: 'createdBy', width: 20 },
              { header: 'Up Dttm', key: 'UpdatedAt', width: 30 },
              { header: 'Up By', key: 'updatedBy', width: 20 },
            ];
            ExcelUtil.export(this.lstHistoryExport,'History',columns,colCenter,[],colRight);
            this.isLoading = false;
          },
          error: err => {
            console.log(err);
            this.isLoading = false;            
          }
        })
        

      }


}
