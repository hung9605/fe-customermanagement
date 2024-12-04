import { Component, OnDestroy, OnInit } from '@angular/core';
import Customer from './customer';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { CustomerService } from './customerservice.service';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant from '../common/constants/CommonConstant';
import { SchedulemedicalComponent } from '../schedulemedical/schedulemedical.component';
import { MedicalexamComponent } from '../medicalexam/medicalexam.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit,OnDestroy{

  sMedicals !: Customer[];
  callData: any;
  ref !: DynamicDialogRef; 

  constructor(private customerService: CustomerService
    , private dialogService: DialogService
  ){

  }

  ngOnInit(): void {
    let sMedical = {
      page: 0
    }

    this.customerService.getListRegister(sMedical).subscribe({
      next: data => {
        this.sMedicals = data.data;
        this.sMedicals.map(item => {
          item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
          item.status = CommonConstant.NO_EXAMINED;
          if(item.status == '0')
            item.status = CommonConstant.NOT_EXAMINED;
          else if(item.status == "1")
            item.status = CommonConstant.EXAMINED;
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.ref.close();
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
    this.ref = this.dialogService.open(MedicalexamComponent,{
      header:'Medical Examination',
      width: '100vh',
      data: obj
    })
  }

  

}
