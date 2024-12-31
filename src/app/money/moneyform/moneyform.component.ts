import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MoneyService } from '../money.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import StringUtil from '../../common/utils/StringUtils';

@Component({
  selector: 'app-moneyform',
  templateUrl: './moneyform.component.html',
  styleUrl: './moneyform.component.scss'
})
export class MoneyformComponent implements OnInit,OnDestroy {

  sMoneyForm!: FormGroup;
  isUpdate: boolean = true;
  dataDialog !: any;

  constructor(
                private dialogConfig:DynamicDialogConfig,
                private moneyService:MoneyService,
                private messageService:MessageService,
                private dialogRef:DynamicDialogRef,
                private router: Router){

  }

  ngOnInit(): void {

    this.dataDialog = this.dialogConfig.data;
        console.log('data money', this.dataDialog);
        
        this.sMoneyForm = new FormGroup({
          id: new FormControl(this.dataDialog.idexam),
          fullName: new FormControl(this.dataDialog.fullName),
          dayOfExamination: new FormControl(this.dataDialog.dateExam),
          status: new FormControl(this.dataDialog.status),
          totalMoney: new FormControl(StringUtil.formatCurrency(this.dataDialog.totalMoney))
        });
    
  }

  ngOnDestroy(): void {
    
  }

  edit(){
    this.isUpdate = false;
  }

  save(){

  }

  close(){
    this.dialogRef.close();
  }

  // Getter for convenience
  get moneyControl() {
    return this.sMoneyForm.get('money');
  }

}
