import { Component, OnDestroy, OnInit } from '@angular/core';
import Customer from '../register/customer';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../register/customerservice.service';
import { HistorycustomerService } from './historycustomer.service';
import { MedicalexamComponent } from '../medicalexam/medicalexam.component';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant from '../common/constants/CommonConstant';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-historycustomer',
  templateUrl: './historycustomer.component.html',
  styleUrl: './historycustomer.component.scss'
})
export class HistorycustomerComponent implements OnInit,OnDestroy {

    sMedicals!: Customer[];
    callData: any;
    ref!: DynamicDialogRef;
    date: any = new Date();
    row = environment.rowPanigator;
    isLoading = true;
    constructor(private registerService:CustomerService
                ,private dialogService:DialogService
                ,private historyService:HistorycustomerService
    ){}

      ngOnInit(): void{
        this.isLoading = true;
        const year = this.date.getFullYear();
        const month = String(this.date.getMonth() + 1).padStart(2,'0');
        const day = String(this.date.getDate()).padStart(2,'0');
        let sMedical = {
          page: 0,
          date: `${year}-${month}-${day}`
        }
        this.getListHistory(sMedical);
      }

      show(obj: any){
        this.historyService.getDetailCustomer(obj).subscribe({
          next: data => {
            obj.isReadOnly = true;
            obj.sympton = data.data.sympton;
            obj.typeOfMedicine = data.data.typeOfMedicine;
            obj.idexam = data.data.id;
            obj.idSchedule = data.data.medical.id;
            obj.isUpdate = true;
            obj.money=data.data.money;
            console.log('objjj',obj);
            this.ref = this.dialogService.open(MedicalexamComponent,{
              header:'Medical Exam',
              width: '100vh',
              data: obj
            })
          }
        })
      }

      search(){
        const year = this.date.getFullYear();
        const month = String(this.date.getMonth() + 1).padStart(2,'0');
        const day = String(this.date.getDate()).padStart(2,'0');
        let sMedical = {
          page: 0,
          date: `${year}-${month}-${day}`
        }
        this.getListHistory(sMedical);
      }

      getListHistory(sMedical: any){
        this.historyService.getListHistory(sMedical).subscribe({
          next: data =>{
            this.sMedicals = data.data;
            this.sMedicals.map(item =>{
              item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
              item.status = CommonConstant.EXAMINED;
            });
            setTimeout(() =>{
              this.isLoading = false;
            },500)
          }
        })
      }


      ngOnDestroy(): void {
        
      }


}
