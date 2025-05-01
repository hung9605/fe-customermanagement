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
            obj.temperature = data.data.temperature;
            obj.healthCondition = data.data.healthCondition;
            obj.createdAt = data.data.createdAt;
            obj.createdBy = data.data.createdBy;
            obj.temperature = data.data.temperature;
            obj.healthCondition = data.data.healthCondition;
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

      exportToExcel(){
        let sMedical = {
          page: 0,
          date: StringUtil.formatDate(this.date,'-'),
          toDate: StringUtil.formatDate(this.toDate,'-')
        }
        this.historyService.getListHistoryExport(sMedical).subscribe({
          next: data =>{
            this.lstHistoryExport = data.data;
            console.log('this.export',this.lstHistoryExport);
            this.export();
            // this.sMedicals.map(item =>{
            //   item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
            //   item.status = CommonConstant.EXAMINED;
            // });
            // setTimeout(() =>{
            //   this.isLoading = false;
            // },500)
          }
        })
        

      }

      export(){
        const workbook = new ExcelJS.Workbook(); // Create a new workbook
            const worksheet = workbook.addWorksheet('Sheet 1'); // Add a worksheet to the workbook
            worksheet.columns = [
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
            //style header
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' };
            //insert data
            this.lstHistoryExport.forEach((item,index) => {
              const row = worksheet.addRow(item);
              let stt = row.getCell('A');
              stt.value = index++;
              const dateRegister = row.getCell('C');
              dateRegister.alignment = { horizontal: 'center', vertical: 'middle' };
              const timeRegister = row.getCell('D');
              timeRegister.alignment = { horizontal: 'center', vertical: 'middle' };
              const timeActual = row.getCell('E');
              timeActual.alignment = { horizontal: 'center', vertical: 'middle' };
              const status = row.getCell('F');
              status.alignment = { horizontal: 'center', vertical: 'middle' };
              const temperature = row.getCell('G');
              temperature.alignment = { horizontal: 'right', vertical: 'middle' };
              const totalMoney = row.getCell('K');
              totalMoney.alignment = { horizontal: 'right', vertical: 'middle' };
              // Format the 'birthDate' column
              //const birthDate = new Date(item.dateOfBirth);
              // const birthDateCell = row.getCell('D');
              // //birthDateCell.value = birthDate;
              // birthDateCell.numFmt = 'YYYY/MM/DD'; // Format as MM/DD/YYYY
              // birthDateCell.alignment = { horizontal: 'center', vertical: 'middle' };
              // row.getCell('C').alignment = {horizontal:'right',vertical:'middle'};
              // row.getCell('A').alignment = {horizontal:'center',vertical:'middle'};
              // row.getCell('F').value = item.status == '0' ?'Active':"Not Active";
              // const initDttm = row.getCell('G');
              // //initDttm.value = new Date(item.createdAt);
              // initDttm.numFmt = 'YYYY/MM/DD';
              // initDttm.alignment = { horizontal: 'center', vertical: 'middle' };
              // const upDttm = row.getCell('I');
              // //upDttm.value = new Date(item.updatedAt);
              // upDttm.numFmt = 'YYYY/MM/DD';
              // upDttm.alignment = { horizontal: 'center', vertical: 'middle' };
            });
            // Generate the Excel file buffer
            workbook.xlsx.writeBuffer().then((buffer) => {
              const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              saveAs(blob, 'History.xlsx'); // Trigger the download with file name "example.xlsx"
            });
      }


}
