import { Component, OnDestroy, OnInit } from '@angular/core';
import MoneyDto from './moneyDto';
import { MoneyService } from './money.service';
import StringUtil from '../common/utils/StringUtils';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MoneyformComponent } from './moneyform/moneyform.component';
import { environment } from '../../environments/environment';
import ExcelUtil from '../common/utils/ExcelUtil';

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
  columnTitles = [{title:'STT',style:'w-1'},{title:'Full Name',style:'w-3'},{title:'Date Exam',style:'w-3'},
    {title:'Money',style:'w-2'},{title:'Status',style:'w-2'},{title:'Action',style:'w-3'}];
    lstMoneyExport!: MoneyDto[];
  constructor(private moneyService:MoneyService,
              private dialogService: DialogService,
  ){

  }

  ngOnInit(): void {
    this.getDataList();   
  }

  ngOnDestroy(): void {
    
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
    this.moneyService.getList(sMoney).subscribe({
      next: data =>{
        this.sMoney = data.data;
        this.sMoney.map(item =>{
            item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
            item.status = item.status == '1' ? 'PAID': 'NOT PAID';
        });
        this.totalMoney = this.sMoney.reduce((sum, product) => sum + Number(product.totalMoney), 0);
        setTimeout(() =>{
          this.isLoading = false;
        },500)
      }
    });
  }

  show(item: MoneyDto){
        this.ref = this.dialogService.open(MoneyformComponent,{
          header: 'Payment detail information',
          width: '100vh',
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
              next: data =>{
                this.lstMoneyExport = data.data;
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
