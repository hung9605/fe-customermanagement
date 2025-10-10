import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../environments/environment';
import { RegisterhistoryService } from './registerhistory.service';
import Customer from '../register/customer';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant from '../common/constants/CommonConstant';
import ExcelUtil from '../common/utils/ExcelUtil';
import { Subject, takeUntil } from 'rxjs';
import ApiResponse from '../common/api/Respone';
import { getChartColors, setOptionBar, setOptionBarVertical } from '../common/constants/Chart';
import { ChartData } from '../customer/customerDto';

@Component({
  selector: 'app-registerhistory',
  templateUrl: './registerhistory.component.html',
  styleUrl: './registerhistory.component.scss'
})
export class RegisterhistoryComponent implements OnInit{

      sMedicals !: Customer[];
      callData: any;
      ref !: DynamicDialogRef; 
      isLoading = true;
      searchText: string = ''; 
      filteredCustomers!: Customer[] 
      srcImage = environment.SRC_IMAGE;
      date: any = new Date();
      toDate: any = new Date();
      row = environment.rowPanigator;
      readonly columnTitles = [
         {title:'STT',class:'text-center text-black-alpha-90',classHeader:'w-1', field: 'index'}
        ,{title:'Full Name',class:'text-left text-black-alpha-90',classHeader:'w-3',field:'fullName'}
        ,{title:'Phone Number',class:'text-right text-indigo-600',classHeader:'w-2',field:'phoneNumber'}
        ,{title:'Gender',class:'text-center text-indigo-600',classHeader:'w-1',field:'gender'}
        ,{title:'Date Register',class:'text-center text-indigo-600',classHeader:'w-2',field:'dateRegister'}
        ,{title:'Time Register',class:' text-center text-indigo-600',classHeader:'w-1',field:'timeRegister'}
        ,{title:'Status',class:'text-center pl-3 pr-3 pt-1 pb-1',classHeader:'w-2',field:'status'}
      ];
      chart: any;
      labelChart: string[] = [];
      valueExam!: number[];
      valueNoExam!: number[];
      options: any;
      private destroy$ = new Subject<void>();
      
      constructor(private service: RegisterhistoryService
                 ,private dialogService: DialogService){
      }
    
      ngOnInit(): void {
        this.loadData();
      }
    
      ngOnDestroy(): void {
       this.destroy$.next();
       this.destroy$.complete();
      }
    

      loadData(){
        this.isLoading = true;
        let sMedical = {
              page: 0,
              date: StringUtil.formatDate(this.date,'-'),
              toDate:StringUtil.formatDate(this.toDate,'-')
        }
        const mapStatus = (status: any): string => {
          if (status == environment.STA_NOTEXAM) return CommonConstant.NOT_EXAMINED;
          if (status == environment.STA_EXAM) return CommonConstant.EXAMINED;
          return CommonConstant.NO_EXAMINED;
        };
        this.service.getListRegister(sMedical).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res: ApiResponse) => {
            this.sMedicals = res.data.map((item: Customer) => ({
              ...item,
              fullName: StringUtil.capitalizeFirstLetter(item.fullName ?? ""),
              status: mapStatus(item.status)
            }));
            this.filteredCustomers = this.sMedicals;
            this.offLoading();
          },
          error: err => {
            console.log(err);
            this.offLoading();
          }
        })
        this.getDataChart(sMedical);
      };

      offLoading(){
        setTimeout(() =>{
          this.isLoading = false;
        },500)
      }

      search(){
        this.loadData();
      }

      exportToExcel(){
          const colCenter = ['dateRegister', 'timeRegister', 'status'];
          const colRight = ['phoneNumber'];
          const columns = [
                        { header: 'STT', key: 'index', width: 10 },
                        { header: 'Full Name', key: 'fullName', width: 20 },
                        { header: 'Phone Number', key: 'phoneNumber', width: 20 },
                        { header: 'Date Register', key: 'dateRegister', width: 20 },
                        { header: 'Time Register', key: 'timeRegister', width: 20 },
                        { header: 'Status', key: 'status', width: 10},
          ];
          ExcelUtil.export(this.filteredCustomers,'List Register History',columns,colCenter,[],colRight);
      }

      getDataChart(sMedical: any){
              this.service.gethistoryChart(sMedical).subscribe({
                next: ({data}) => {
                  const dataChart: ChartData[] = data;
                  this.labelChart  = [...new Set(dataChart.map(item => item.month))];
                  this.valueExam   = [...new Set(dataChart.filter(item => item.status == 'Examined').map(item => item.total))];
                  this.valueNoExam = [...new Set(dataChart.filter(item => item.status == 'No Examined').map(item => item.total))];
                  
                  if(this.labelChart){
                    this.initChart();
                  }
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
                                label: 'Examined',
                                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                                data: this.valueExam
                            },
                            {
                                type: 'bar',
                                label: 'No Examined',
                                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                                data: this.valueNoExam
                            }
                        ]
                    };
                    this.options = setOptionBarVertical(textColor, textColorSecondary, surfaceBorder);
            }
}