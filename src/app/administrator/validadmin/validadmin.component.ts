import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-validadmin',
  templateUrl: './validadmin.component.html',
  styleUrl: './validadmin.component.scss'
})
export class ValidadminComponent implements OnInit, OnDestroy {

  sValidate !: FormGroup;
  fileName = 'export.sql';
  private  destroy$ = new Subject<void>();

  constructor(private adminService:AdminService,
              private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.sValidate = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Handle form submission
  login() {

    if(!this.sValidate.valid){
      return;
    }
    const sUser ={
      username:this.f['username'].value,
      password: this.f['password'].value
    }

    this.adminService.authenticate(sUser).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Blob) => {
          const url = window.URL.createObjectURL(data);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.fileName; 
          a.click();
          window.URL.revokeObjectURL(url); 
      },
      error: err =>{
        
      }
    })
  

  }

  get f(){return this.sValidate.controls;}

}
