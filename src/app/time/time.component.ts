import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from './time.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject, takeUntil } from 'rxjs';
import CommonConstant from '../common/constants/CommonConstant';
import { Message } from '../common/constants/Message';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent implements OnInit, OnDestroy{

  timeConfig !: FormGroup;
  srcImage = environment.SRC_IMAGE;
  private destroy$ = new Subject<void>();
  constructor(private timeService: TimeService,
              private messageService: MessageService,
              private router:Router,
              private fb: FormBuilder
  ){}

  readonly fields = [
    { label: 'Start Time', name: 'startTime' },
    { label: 'End Time', name: 'endTime' },
    { label: 'Interval Time', name: 'intervalTime' }
  ];
  

  ngOnInit(): void {
      this.initForm();
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
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
        summary: CommonConstant.ERROR_TITLE,
        severity: CommonConstant.ERROR,
        detail: Message.VALIDATION.REQUIRED_FIELDS
      });
      return;
    }


    this.timeService.configtime(this.timeConfig.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.messageService.add({summary:CommonConstant.SUCCESS_TITLE,severity:CommonConstant.SUCCESS,detail:Message.SUCCESS.SAVE_SUCCESS});
        setTimeout(() =>{
          this.router.navigate(['/']);
        },500)
      },
      error: err =>{console.log(err);
      }
    })
  }

}
