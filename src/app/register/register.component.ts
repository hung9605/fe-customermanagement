import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../environments/environment';
import CommonConstant from '../common/constants/CommonConstant';
import StringUtil from '../common/utils/StringUtils';
import { Medicalexamv1Component } from '../medicalexamv1/medicalexamv1.component';
import { SchedulemedicalComponent } from '../schedulemedical/schedulemedical.component';
import Customer from './customer';
import { CustomerService } from './customerservice.service';

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
  searchText: string = ''; // Search input text
  filteredCustomers: any[] = this.sMedicals; // Filtered list
  columnTitles = [
     {title:'STT',style:'w-1'}
    ,{title:'Full Name',style:'w-3'}
    ,{title:'Phone Number',style:'w-2'}
    ,{title:'Time Register',style:'w-1'}
    ,{title:'Status',style:'w-2'}
    ,{title:'Action',style:'w-3'}
  ];
  constructor(private customerService: CustomerService
             ,private dialogService: DialogService
  )
  {}

  ngOnInit(): void {
    this.isLoading = true;
    this.customerService.listen().subscribe((m:any) =>{
        this.loadData();
    });
    this.loadData();
  }

  ngOnDestroy(): void {
   
  }

  show(obj: any){
    obj.idSchedule = obj.customer.id;
    console.log('objtest',obj);
    this.ref = this.dialogService.open(SchedulemedicalComponent,{
      header:'Customer Register',
      width: '70%',
      data: obj
    })

  }
  examination(obj: any){
    console.log('obj',obj);
    obj.isReadOnly = false;
    obj.idSchedule = obj.id;
    this.ref = this.dialogService.open(Medicalexamv1Component,{
      header:'Medical Examination',
      width: '70%',
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
        this.filteredCustomers = this.sMedicals;
        setTimeout(() =>{
          this.isLoading = false;
        },500)
      }
    })
  }

 search(dt1: any) {
    if (this.searchText.trim() === '') {
      // Nếu không có tìm kiếm, hiển thị tất cả dữ liệu
      this.filteredCustomers = this.sMedicals;
    } else {
      // Lọc dữ liệu theo từ khóa tìm kiếm
      this.filteredCustomers = this.sMedicals.filter(customer => 
        customer.fullName?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    dt1.first = 0; // Reset pagination to the first page after search
  }
}