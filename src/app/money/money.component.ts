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
  ref !: DynamicDialogRef;

  constructor(private moneyService:MoneyService,
              private dialogConfig: DynamicDialogConfig,
              private dialogRef: DynamicDialogRef,
              private dialogService: DialogService,
  ){

  }

  ngOnInit(): void {
        let sMoney = {
          page: 0,
          date: StringUtil.formatDate(this.date,'-')
        }
        this.moneyService.getList(sMoney).subscribe({
          next: data =>{
            this.sMoney = data.data;
            this.sMoney.map(item =>{
                item.status = item.status == '0' ? 'PAID': 'NOT PAID';
            })
          }
        });


    
  }

  ngOnDestroy(): void {
    
  }

  search(){

  }

  show(item: MoneyDto){
        this.ref = this.dialogService.open(MoneyformComponent,{
          header: 'Paid Money',
          width: '100vh',
          data: item
        });

  }

}
