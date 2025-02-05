import { Component, OnDestroy, OnInit } from '@angular/core';
import MoneyDto from './moneyDto';
import { MoneyService } from './money.service';
import StringUtil from '../common/utils/StringUtils';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MoneyformComponent } from './moneyform/moneyform.component';

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
          header: 'Paid Money',
          width: '100vh',
          data: item
        });

  }

}
