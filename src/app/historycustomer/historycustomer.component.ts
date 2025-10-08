import { Component, OnDestroy, OnInit } from '@angular/core';
import Customer from '../register/customer';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../register/customerservice.service';
import { HistorycustomerService } from './historycustomer.service';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant, { TITLE } from '../common/constants/CommonConstant';
import { environment } from '../../environments/environment';
import { Medicalexamv1Component } from '../medicalexamv1/medicalexamv1.component';
import ExamDetail from './examdetail';
import ExcelUtil from '../common/utils/ExcelUtil';
import { SearchMedicalDto } from './SearchMedicalDto';
import { finalize, Subject, takeUntil } from 'rxjs';
import { getChartColors, setOptionBar } from '../common/constants/Chart';
import { ChartData } from '../customer/customerDto';

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
    readonly columnTitles = [
       {title:'STT',style:'w-1'}
      ,{title:'Full Name',style:'w-3'}
      ,{title:'Date Register',style:'w-2'}
      ,{title:'Time Register',style:'w-2'}
      ,{title:'Status',style:'w-2'}
      ,{title:'Action',style:'w-3'}];
  chart: any;
  labelChart: string[] = [];
  valueChart!: number[];
  options: any;
    private destroy$ = new Subject<void>();
    constructor(private registerService:CustomerService
                ,private dialogService:DialogService
                ,private historyService:HistorycustomerService
    ){}

      ngOnInit(): void{
        this.isLoading = true;
        const sMedical = {
          page: 0,
          date: StringUtil.formatDate(this.date,'-'),
          toDate: StringUtil.formatDate(this.toDate,'-')
        }
        this.getListHistory(sMedical);
      }

      show(obj: any){
        console.log(obj);
        
        this.historyService.getDetailCustomer(obj).subscribe({
          next: ({data}) => {

            const {
              sympton,
              typeOfMedicine,
              id,
              money,
              totalMoney,
              quantity,
              temperature,
              healthCondition,
              createdAt,
              createdBy,
              timeActual,
              finalOpinion,
              medical
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
              temperature,
              healthCondition,
              createdAt,
              createdBy,
              timeActual,
              finalOpinion
            });
            this.ref = this.dialogService.open(Medicalexamv1Component,{
              header:TITLE.EXAM.TITLE,
              width: TITLE.EXAM.WIDTH,
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
          date:   StringUtil.formatDate(this.date,'-'),
          toDate: StringUtil.formatDate(this.toDate,'-')
        }
        this.getListHistory(sMedical);
        this.getDataChart(sMedical);
      }

      getListHistory(sMedical: any){
        this.historyService.getListHistory(sMedical).subscribe({
          next: data =>{
            this.sMedicals = data.data;
            this.sMedicals.map(item =>{
              item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
              item.status = CommonConstant.EXAMINED;
            });
            this.offLoading(500);
          },
          error: err => {
            console.log(err);
            this.offLoading(500);
          }
        })
      }

      getDataChart(sMedical: any){
        this.historyService.gethistoryChart(sMedical).subscribe({
          next: ({data}) => {
            const dataChart: ChartData[] = data;
            this.labelChart = [...new Set(dataChart.map(item => item.month))];
            this.valueChart = [...new Set(dataChart.map(item => item.total))];
            this.initChart();
          }
          ,error: err => {}
        })
      }

      initChart() {
              const { textColor, textColorSecondary, surfaceBorder,documentStyle } = getChartColors();
              this.chart = {
                  labels: this.labelChart,
                  datasets: [
                      {
                          type: 'bar',
                          label: 'Number Examined',
                          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                          data: this.valueChart
                      }
                  ]
              };
              this.options = setOptionBar(textColor, textColorSecondary, surfaceBorder);
      }

      offLoading(time: number){
        setTimeout(() =>{
          this.isLoading = false;
        },time)
      }

      ngOnDestroy(): void {
        if (this.ref) {
          this.ref.close();
        }
        this.destroy$.next();
        this.destroy$.complete();
      }

      exportToExcel(){
        if (this.isLoading) return;
        let sMedical:SearchMedicalDto = {
          page: 0,
          date: StringUtil.formatDate(this.date,'-'),
          toDate: StringUtil.formatDate(this.toDate,'-')
        }
        this.isLoading = true;
        this.historyService.getListHistoryExport(sMedical).pipe( 
        takeUntil(this.destroy$),finalize(() => {
          this.offLoading(500);
          console.log("export finish");
          
        })
        ).subscribe({
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
          },
          error: err => {
            console.log(err);           
          }
        })
        

      }


}
