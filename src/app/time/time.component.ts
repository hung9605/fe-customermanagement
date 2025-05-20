import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from './time.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent implements OnInit{

  timeConfig !: FormGroup;
  srcImage = environment.SRC_IMAGE;
  constructor(private timeService: TimeService,
              private messageService: MessageService,
              private router:Router,
              private fb: FormBuilder
  ){}

  fields = [
    { label: 'Start Time', name: 'startTime' },
    { label: 'End Time', name: 'endTime' },
    { label: 'Interval Time', name: 'intervalTime' }
  ];
  

  ngOnInit(): void {
      this.initForm();
  }

  initForm(): void {
    this.timeConfig = this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      intervalTime: ['', Validators.required]
    });
  }


  create(){

    if (this.timeConfig.invalid) {
      this.messageService.add({
        summary: 'Invalid Input',
        severity: 'error',
        detail: 'Please fill in all required fields.'
      });
      return;
    }


    this.timeService.configtime(this.timeConfig.value).subscribe({
      next: data => {
        this.messageService.add({summary:'Config Sucsess',severity:'success',detail:'Time config Successfully'});
        setTimeout(() =>{
          this.router.navigate(['/']);
        },500)
      },
      error: err =>{console.log(err);
      }
    })
  }

}
