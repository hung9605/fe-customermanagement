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
    console.log('this.sValidate',this.sValidate);
    
    if(this.sValidate.valid){

    let sUser ={
      username:this.f['username'].value,
      password: this.f['password'].value
    }

    this.adminService.authenticate(sUser).subscribe({
      next: (data: Blob) => {
          const url = window.URL.createObjectURL(data);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'export.sql';  // Set the file name you want the user to download
          a.click();
          window.URL.revokeObjectURL(url); 
      },
      error: err =>{
        
      }
    })
  }

  }

  get f(){return this.sValidate.controls;}

}
