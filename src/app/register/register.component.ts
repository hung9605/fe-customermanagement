import { Component, OnDestroy, OnInit } from '@angular/core';
import Customer from './customer';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { CustomerService } from './customerservice.service';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant from '../common/constants/CommonConstant';
import { SchedulemedicalComponent } from '../schedulemedical/schedulemedical.component';
import { MedicalexamComponent } from '../medicalexam/medicalexam.component';
import { environment } from '../../environments/environment';
import { Medicalexamv1Component } from '../medicalexamv1/medicalexamv1.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit,OnDestroy{

  sMedicals !: Customer[];
  callData: any;
  ref !: DynamicDialogRef; 
  isLoading = true;
  constructor(private customerService: CustomerService
    , private dialogService: DialogService
  ){

    

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.customerService.listen().subscribe((m:any) =>{
        console.log('test emiter',m);
        this.loadData();
    });
    this.loadData();

  }

  ngOnDestroy(): void {
   
  }

  show(obj: any){
    
    obj.idSchedule = obj.id;
    console.log('objtest',obj);
    this.ref = this.dialogService.open(SchedulemedicalComponent,{
      header:'Schedule Medical',
      width: '100vh',
      data: obj
    })

  }
  examination(obj: any){
    console.log('obj',obj);
    obj.isReadOnly = false;
    obj.idSchedule = obj.id;
    this.ref = this.dialogService.open(Medicalexamv1Component,{
      header:'Medical Examination',
      width: '60rem',
      height:'100vh',
      data: obj
    })
  }

  loadData(){
    let sMedical = {
      page: 0
    }

    this.customerService.getListRegister(sMedical).subscribe({
      next: data => {
        this.sMedicals = data.data;
        this.sMedicals.map(item => {
          item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
          item.status = CommonConstant.NO_EXAMINED;
          if(item.status == environment.STA_NOTEXAM)
            item.status = CommonConstant.NOT_EXAMINED;
          else if(item.status == environment.STA_EXAM)
            item.status = CommonConstant.EXAMINED;
        });
        setTimeout(() =>{
          this.isLoading = false;
        },500)

      }
    })
  }

  

}
