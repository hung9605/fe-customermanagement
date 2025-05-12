import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../customerservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CommonConstant,{HttpStatus} from '../../common/constants/CommonConstant';
import { onlyLettersValidator, validateLength } from '../../validate/custom-validator';
import Time from './timeDto';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-formregister',
  templateUrl: './formregister.component.html',
  styleUrl: './formregister.component.scss'
})
export class FormregisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required,onlyLettersValidator()]),
    phoneNumber: new FormControl('',[Validators.required,validateLength(10)]),
    address: new FormControl('',[Validators.required]),
    dateOfBirth: new FormControl('',[Validators.required]),
    registrationTime: new FormControl<Time | null>(null),
    gender: new FormControl('',Validators.required)
  });
  sTime!: Time[];
  srcImage = environment.SRC_IMAGE;
  btnRegister = 'Register'

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

  register(){
    if(this.registerForm.valid){
    const fullName = this.f.name.value;
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
    }

    const customer = {
       firstName: firstName,
       midName: midName,
       lastName: lastName,
       phoneNumber: objAccount.phoneNumber
    }
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
    
    this.messageService.add({severity:CommonConstant.ERROR,summary:CommonConstant.ERROR_TITLE, detail: 'Field not blank!'});
    
  }

  }

  get f(){return this.registerForm.controls;}

  createSchedule(obj:any){
    this.customerService.addScheduleMedical(obj).subscribe({
      next: data =>{
        if(data.status == HttpStatus.OK){
        this.messageService.add({severity:CommonConstant.SUCCESS,summary:CommonConstant.SUCCESS_TITLE,detail:'Register successfully customer ' + data.data.fullName});
        setTimeout(() =>{ 
          this.router.navigate(['/listregister']);
        },1000)
      }else{
        this.messageService.add({severity:CommonConstant.ERROR,summary:CommonConstant.ERROR_TITLE,detail:data.error.data});
      }
      },
      error: err =>{
        this.messageService.add({severity:CommonConstant.ERROR,summary:CommonConstant.ERROR_TITLE,detail:err.error.data + ',Please change time register'});
        
      }
    });
  }

  checkRegisterTime(time: string):boolean{
    this.customerService.checktimeRegister(time).subscribe({
      next: data =>{
        if(data.data){
 
        }
      }
    });
    

    return true;
  }

}  