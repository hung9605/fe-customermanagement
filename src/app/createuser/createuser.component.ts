import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyLettersValidator, validateLength } from '../validate/custom-validator';
import Time from '../register/formregister/timeDto';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../register/customerservice.service';
import { environment } from '../../environments/environment';
import CommonConstant from '../common/constants/CommonConstant';
import { Message } from '../common/constants/Message';

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
    if (this.registerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Field not blank!'
      });
      return;
    }
    

    const fullName = this.f.fullName.value;
    const arrName = fullName?.split(" ");
    if (!arrName?.length) return;

    const [firstName, ...rest] = arrName;
    const lastName = rest.pop() || '';
    const midName = rest.join(' ');

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

    console.log('this.f.registrationTime',this.f.registrationTime);
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

  }

  get f(){
    return this.registerForm.controls;
  }

  createSchedule(obj:any){
    this.customerService.addScheduleMedical(obj).subscribe({
      next: data =>{
        if(data.status == '200'){
        this.messageService.add({severity:CommonConstant.SUCCESS,summary:CommonConstant.SUCCESS_TITLE,detail:Message.SUCCESS.REGISTER});
        this.registerForm.reset();
        this.registerForm.patchValue({
          registrationTime: this.sTime[0]
        });
        setTimeout(() =>{
          this.router.navigate(['/listregister']);
        })
      }else{
        this.messageService.add({severity:CommonConstant.ERROR,summary:CommonConstant.ERROR_TITLE,detail:data.error.data});
      }
      },
      error: err =>{
        this.messageService.add({severity:CommonConstant.ERROR,summary:CommonConstant.ERROR_TITLE,detail:err.error.data + ',Please change time register'});
        
      }
    });
  }

}