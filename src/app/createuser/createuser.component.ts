import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyLettersValidator, validateLength } from '../validate/custom-validator';
import Time from '../register/formregister/timeDto';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../register/customerservice.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.scss'
})
export class CreateuserComponent implements OnInit{

  registerForm = new FormGroup({
      fullName: new FormControl('',[Validators.required,onlyLettersValidator()]),
      guardianName: new FormControl('',[Validators.required,onlyLettersValidator()]),
      phoneNumber: new FormControl('',[Validators.required,validateLength(10)]),
      address: new FormControl('',[Validators.required]),
      dateOfBirth: new FormControl('',[Validators.required]),
      registrationTime: new FormControl<Time | null>(null),
      gender: new FormControl('',Validators.required),
      other: new FormControl(''),
  });
  sTime!: Time[];
  srcImage = environment.SRC_IMAGE;
  constructor(private customerService:CustomerService,
                private router:Router,
                private messageService:MessageService){
  }
  
  ngOnInit(): void {
      this.customerService.getTime().subscribe({
        next: data => {this.sTime = data.data;
          this.registerForm.patchValue({
            registrationTime: this.sTime[0]
          })
        },
        error: err => {console.log(err);
        }
      })
  }

  createUser(){
    console.log(this.f);
    
    if(this.registerForm.valid){
    const fullName = this.f.fullName.value;
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
      firstName: firstName,
      midName: midName,
      lastName: lastName,
      phoneNumber: this.f.phoneNumber.value,
      address: this.f.address.value,
      dateOfBirth: this.f.dateOfBirth.value,
      gender: this.f.gender.value,
      other: this.f.other.value
    }

    const customer = {
       firstName: firstName,
       midName: midName,
       lastName: lastName,
       phoneNumber: objAccount.phoneNumber
    }

    // const time = this.f.registrationTime.value;
    //    let timeHour = time?.getHours().toString().padStart(2,'0');
    //    let minutes = time?.getMinutes().toString().padStart(2,'0');
    console.log('this.f.registrationTime',this.f.registrationTime);
    // let timeRegister = ;
       let sMedical = {
        fullName: fullName,
        timeRegister: this.f.registrationTime.value?.time,
        status: 0,
        phoneNumber:objAccount.phoneNumber,
        customer:{
          id:0
        }
    }

    this.customerService.getCustomer(customer).subscribe({
      next: data => {
        console.log(data);
        
        if(null != data.data){
          sMedical.customer.id = data.data.id;
          this.createSchedule(sMedical);
        }else{
          this.customerService.addCustomer(objAccount).subscribe({
            next: data =>{              
              sMedical.customer.id = data.data.id;
              this.createSchedule(sMedical);
            }
          })
        }
      }
    });
  }else{
    
    this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Field not blank!'});
    
  }
  }

  get f(){
    return this.registerForm.controls;
  }

  createSchedule(obj:any){
    this.customerService.addScheduleMedical(obj).subscribe({
      next: data =>{
        if(data.status == '200'){
        this.messageService.add({severity:'success',summary:'success',detail:'Register successfully customer ' + data.data.fullName});
        this.registerForm.reset();
        this.registerForm.patchValue({
          registrationTime: this.sTime[0]
        });
        setTimeout(() =>{
          this.router.navigate(['/listregister']);
        })
      }else{
        this.messageService.add({severity:'error',summary:'error',detail:data.error.data});
      }
      },
      error: err =>{
        this.messageService.add({severity:'error',summary:'error',detail:err.error.data + ',Please change time register'});
        
      }
    });
  }

}