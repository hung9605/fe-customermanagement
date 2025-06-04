import { Component, OnDestroy, OnInit } from '@angular/core';
import MoneyDto from './moneyDto';
import { MoneyService } from './money.service';
import StringUtil from '../common/utils/StringUtils';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MoneyformComponent } from './moneyform/moneyform.component';
import { environment } from '../../environments/environment';
import ExcelUtil from '../common/utils/ExcelUtil';
import CommonConstant, { TITLE } from '../common/constants/CommonConstant';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrl: './money.component.scss'
})
export class MoneyComponent implements OnInit, OnDestroy{

  sMoney!: MoneyDto[]
  date: Date = new Date();
  toDate: Date = new Date();
  ref !: DynamicDialogRef;
  isLoading = true;
  totalMoney: any;
  srcImage = environment.SRC_IMAGE;
  readonly columnTitles = [{title:'STT',style:'w-1'},{title:'Full Name',style:'w-3'},{title:'Date Exam',style:'w-3'},
    {title:'Money',style:'w-2'},{title:'Status',style:'w-2'},{title:'Action',style:'w-3'}];
  lstMoneyExport!: MoneyDto[];
  private  destroy$ = new Subject<void>();
  constructor(private moneyService:MoneyService,
              private dialogService: DialogService,
  ){

  }

  ngOnInit(): void {
    this.getDataList();   
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  search(){
    this.getDataList();
  }

  getDataList(){
    this.isLoading = true;
    let sMoney = {
      page: 0,
      date: StringUtil.formatDate(this.date,'-'),
      toDate:StringUtil.formatDate(this.toDate,'-')
    }

    const getStatus = (status:string) => {
      return status == '1' ? CommonConstant.PAID: CommonConstant.NOT_PAID;
    }
    this.moneyService.getList(sMoney).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({data}) =>{
        this.sMoney = data;
        this.sMoney.map(item =>{
            item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
            item.status = getStatus(item.status)
        });
        this.totalMoney = this.sMoney.reduce((sum, product) => sum + Number(product.totalMoney), 0);
        this.showLoading(500);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  private showLoading (timeLoading: number){
    setTimeout(() =>{
      this.isLoading = false;
    },timeLoading)
  }

  show(item: MoneyDto){
        this.ref = this.dialogService.open(MoneyformComponent,{
          header: TITLE.MONEYFORM.TITLE,
          width: TITLE.MONEYFORM.WIDTH,
          data: item
        });

  }

  exportToExcel(){
    let sMoney = {
      page: 0,
      date: StringUtil.formatDate(this.date,'-'),
      toDate:StringUtil.formatDate(this.toDate,'-')
    }
    this.moneyService.getListExport(sMoney).subscribe({
              next: ({data}) =>{
                this.lstMoneyExport = data;
                let colCenter = [ 'status'];
                let colRight = ['unitPrice', 'totalMoney','quantity'];
                let columns = [
                  { header: 'STT', key: 'index', width: 10 },
                  { header: 'Full Name', key: 'fullName', width: 20 },
                  { header: 'Date Examination', key: 'dateExam', width: 30 },
                  { header: 'Status', key: 'status', width: 10},
                  { header: 'Quantity', key: 'quantity', width: 10 },
                  { header: 'Medicine Name', key: 'medicineName', width: 20 },
                  { header: 'Unit Price', key: 'unitPrice', width: 20 },
                  { header: 'Total Money', key: 'totalMoney', width: 20 }
                ];
                ExcelUtil.export(this.lstMoneyExport,'Money',columns,colCenter,[],colRight);
              },
              error: err => {console.log(err);
              }
            })
  }

}
