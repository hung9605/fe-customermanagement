import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-validadmin',
  templateUrl: './validadmin.component.html',
  styleUrl: './validadmin.component.scss'
})
export class ValidadminComponent implements OnInit, OnDestroy {

  sValidate !: FormGroup;

  constructor(private adminService:AdminService,
              private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.sValidate = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
    
  }

  ngOnDestroy(): void {
    
  }

  // Handle form submission
  login() {

    if(this.sValidate.valid){

    let sUser ={
      username:this.f['username'].value,
      pazzword: this.f['password'].value
    }

    this.adminService.authenticate(sUser).subscribe({
      next: data => {

      },
      error: err =>{
        
      }
    })
  }

  }

  get f(){return this.sValidate.controls;}

}
