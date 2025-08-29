import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MoneyService } from '../money.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import StringUtil from '../../common/utils/StringUtils';
import { environment } from '../../../environments/environment';
import CommonConstant from '../../common/constants/CommonConstant';

import { Subscription } from 'rxjs';
import { Message } from '../../common/constants/Message';

@Component({
  selector: 'app-moneyform',
  templateUrl: './moneyform.component.html',
  styleUrl: './moneyform.component.scss'
})
export class MoneyformComponent implements OnInit,OnDestroy,AfterViewInit {

  sMoneyForm!: FormGroup;
  isUpdate: boolean = true;
  suppliesList !: any;
  row = 10;
  srcImage = environment.SRC_IMAGE;
  columnTitles = [
    {title:'STT',style:'w-1'}
    ,{title:'Medicine Name',style:'w-3'}
    ,{title:'Quantity',style:'w-2'}
    ,{title:'Unit Price',style:'w-2'}
  ];
  isFormChanged: any;
  subscriptions: Subscription = new Subscription(); 
  // @ViewChild('fullNameInput') fullNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fullNameInput') fullNameInput!: ElementRef<HTMLInputElement>;
  constructor(
                private dialogConfig:DynamicDialogConfig,
                private moneyService:MoneyService,
                private messageService:MessageService,
                private dialogRef:DynamicDialogRef,
                private router: Router){

  }

  ngOnInit(): void {
        const { idExam, fullName, dateExam, status, totalMoney } = this.dialogConfig.data;
        this.sMoneyForm = new FormGroup({
          id: new FormControl(idExam),
          fullName: new FormControl(fullName),
          dayOfExamination: new FormControl(dateExam),
          status: new FormControl(status),
          totalMoney: new FormControl(StringUtil.formatCurrency(totalMoney))
        });

        this.subscriptions.add(
          this.sMoneyForm.valueChanges.subscribe(() => {
            this.isFormChanged = this.sMoneyForm.dirty;
          })
        );
        this.loadSuppliesList(idExam);
  }

  private loadSuppliesList(idExam: number): void {
    this.moneyService.getListSupplies({ id: idExam })
    .subscribe({
      next: ({ data }) => {
        this.suppliesList = data;
      },
      error: err => {
        console.error('Error loading supplies list:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.fullNameInput?.nativeElement.focus();
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  edit(){
    this.isUpdate = false;
  }

  save(){

    if(this.isFormChanged){

    }else{
       this.messageService.add({severity:CommonConstant.ERROR,summary:CommonConstant.ERROR_TITLE,detail:Message.VALIDATION.DATA_NOT_CHANGE});
    }
  }

  close(){
    setTimeout(() => this.dialogRef.close(), 150);
  }

  get moneyControl() {
    return this.sMoneyForm.get('money');
  }

}
