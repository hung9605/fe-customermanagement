import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyLettersValidator, validateLength } from '../../validate/custom-validator';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../customer.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formcustomer',
  templateUrl: './formcustomer.component.html',
  styleUrl: './formcustomer.component.scss'
})
export class FormCustomerComponent implements OnInit,OnDestroy {
  
  customerForm !: FormGroup;
  dataDialog!: any;
  isReadOnly = true;
  isUpdate = true;

  constructor(private dialogConfig:DynamicDialogConfig,
              private customerservice:CustomerService,
              private ref:DynamicDialogRef,
              private messageService:MessageService,
              private router: Router
  ){

  }

  ngOnInit(): void {
    this.isUpdate = true;
    this.dataDialog = this.dialogConfig.data;
    this.customerForm = new FormGroup({
      name: new FormControl(this.dataDialog.fullName,[Validators.required,onlyLettersValidator()]),
      phoneNumber: new FormControl(this.dataDialog.phoneNumber,[Validators.required,validateLength(10)]),
      address: new FormControl(this.dataDialog.address,[Validators.required]),
      status: new FormControl(this.dataDialog.status,Validators.required),
      dateOfBirth: new FormControl<Date | null>(new Date(this.dataDialog.dateOfBirth),[Validators.required])
    });
   
  }

  ngOnDestroy(): void {
    
  }

  edit(){
    this.isReadOnly = false;
    this.isUpdate = false;
  }

  save(){
    const fullName = this.f['name'].value;
    const arrName=fullName?.split(" ");
    let firstName = "";
    let midName = "";
    let lastName = "";
  
    if(null != arrName){
      firstName = arrName[0];
      lastName = arrName[arrName.length - 1];
      for(let i = 1; i < arrName.length-1; i++){
        midName += arrName[i] +" ";
      }
    }

    let objAccount={
      id: this.dataDialog.id,
      firstName: firstName,
      midName: midName,
      lastName: lastName,
      phoneNumber: this.f['phoneNumber'].value,
      address: this.f['address'].value,
      dateOfBirth: this.f['dateOfBirth'].value,
      status: 0,
      createdAt: this.dataDialog.createdAt,
      createdBy: this.dataDialog.createdBy
    }
    console.log('update account', objAccount);
    
    this.customerservice.updateCustomer(objAccount).subscribe({
      next: data => {
        this.messageService.add({severity:'success', summary:'Success',detail:'Update successfully ' + data.data.fullName});
         setTimeout(() => {
           this.ref.close();
           this.router.navigateByUrl('/',{skipLocationChange:true}).then(() =>{
            this.router.navigate(['/listcustomer']);
          })
         },500);
      },
      error: err =>{

      }
    })
    
  }

  close(){
    this.ref.close();
  }
  get f(){
    return this.customerForm.controls;
  }
}
