import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyLettersValidator, validateLength } from '../../validate/custom-validator';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../customer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formcustomer',
  templateUrl: './formcustomer.component.html',
  styleUrl: './formcustomer.component.scss'
})
export class FormCustomerComponent implements OnInit,OnDestroy {
  
  customerForm !: FormGroup;
  dataDialog!: any;
  isReadOnly = true;
  isUpdate = false;

  constructor(private dialogConfig:DynamicDialogConfig,
              private customerservice:CustomerService,
              private ref:DynamicDialogRef,
              private messageService:MessageService
  ){

  }

  ngOnInit(): void {
    this.dataDialog = this.dialogConfig.data;
    this.customerForm = new FormGroup({
      name: new FormControl(this.dataDialog.name,[Validators.required,onlyLettersValidator()]),
      phoneNumber: new FormControl(this.dataDialog.phoneNumber,[Validators.required,validateLength(10)]),
      address: new FormControl(this.dataDialog.address,[Validators.required]),
      status: new FormControl(this.dataDialog.status,Validators.required),
      dateOfBirth: new FormControl<Date | null>(this.dataDialog.dateOfBirth,[Validators.required])
    });
    this.isReadOnly = this.dataDialog.isReadOnly;
    this.isUpdate = this.dataDialog.isUpdate;
  }

  ngOnDestroy(): void {
    
  }
}
