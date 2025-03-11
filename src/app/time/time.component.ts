import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from './time.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent implements OnInit{

  timeConfig !: FormGroup;
  constructor(private timeService: TimeService,
              private messageService: MessageService,
              private router:Router,
  ){}

  ngOnInit(): void {
      this.timeConfig = new FormGroup({
        startTime: new FormControl('',[Validators.required]),
        endTime: new FormControl('',[Validators.required]),
        intervalTime: new FormControl('',[Validators.required]),
  });
  }

  create(){
    console.log(this.timeConfig.value);
    
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
