import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MoneyService } from '../money.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moneyform',
  templateUrl: './moneyform.component.html',
  styleUrl: './moneyform.component.scss'
})
export class MoneyformComponent implements OnInit,OnDestroy {

  sMoneyForm!: FormGroup;
  isUpdate: boolean = true;

  constructor(
                private dialogConfig:DynamicDialogConfig,
                private moneyService:MoneyService,
                private ref:DynamicDialogRef,
                private messageService:MessageService,
                private router: Router){

  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  edit(){
    this.isUpdate = false;
  }

  save(){

  }

  close(){
    this.close();
  }

}
