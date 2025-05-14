import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../environments/environment';
import { RegisterhistoryService } from './registerhistory.service';
import Customer from '../register/customer';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant from '../common/constants/CommonConstant';
import ExcelUtil from '../common/utils/ExcelUtil';

@Component({
  selector: 'app-registerhistory',
  templateUrl: './registerhistory.component.html',
  styleUrl: './registerhistory.component.scss'
})
export class RegisterhistoryComponent implements OnInit{

      sMedicals !: Customer[];
      callData: any;
      ref !: DynamicDialogRef; 
      isLoading = true;
      searchText: string = ''; // Search input text
      filteredCustomers!: Customer[] // Filtered list
      srcImage = environment.SRC_IMAGE;
      date: any = new Date();
      toDate: any = new Date();
      row = environment.rowPanigator;
      columnTitles = [
         {title:'STT',class:'text-center text-black-alpha-90',classHeader:'w-1', field: 'index'}
        ,{title:'Full Name',class:'text-left text-black-alpha-90',classHeader:'w-3',field:'fullName'}
        ,{title:'Phone Number',class:'text-right text-indigo-600',classHeader:'w-2',field:'phoneNumber'}
        ,{title:'Gender',class:'text-center text-indigo-600',classHeader:'w-1',field:'gender'}
        ,{title:'Date Register',class:'text-center text-indigo-600',classHeader:'w-2',field:'dateRegister'}
        ,{title:'Time Register',class:' text-center text-indigo-600',classHeader:'w-1',field:'timeRegister'}
        ,{title:'Status',class:'text-center pl-5 pr-5',classHeader:'w-2',field:'status'}
      ];
      
      constructor(private service: RegisterhistoryService
                 ,private dialogService: DialogService){
      }
    
      ngOnInit(): void {
        this.isLoading = true;
        this.loadData();
      }
    
      ngOnDestroy(): void {
       
      }
    

      loadData(){
        this.isLoading = true;
        let sMedical = {
              page: 0,
              date: StringUtil.formatDate(this.date,'-'),
              toDate:StringUtil.formatDate(this.toDate,'-')
        }
        this.service.getListRegister(sMedical).subscribe({
          next: ({data}) => {
            this.sMedicals = data;
           this.sMedicals.map(item => {
              item.fullName = StringUtil.capitalizeFirstLetter(item.fullName ?? "");
              if(item.status == environment.STA_NOTEXAM)
                item.status = CommonConstant.NOT_EXAMINED;
              else if(item.status == environment.STA_EXAM)
                item.status = CommonConstant.EXAMINED;
              else 
                item.status = CommonConstant.NO_EXAMINED;
            });
            this.filteredCustomers = this.sMedicals;
            this.offLoading();
          },
          error: err => {
            console.log(err);
            this.offLoading();
          }
        })
      }
      offLoading(){
        setTimeout(() =>{
          this.isLoading = false;
        },500)
      }
    
      search(){
        this.loadData();
      }

      exportToExcel(){
          let colCenter = ['dateRegister', 'timeRegister', 'status'];
          let colRight = ['phoneNumber'];
          let columns = [
                        { header: 'STT', key: 'index', width: 10 },
                        { header: 'Full Name', key: 'fullName', width: 20 },
                        { header: 'Phone Number', key: 'phoneNumber', width: 20 },
                        { header: 'Date Register', key: 'dateRegister', width: 20 },
                        { header: 'Time Register', key: 'timeRegister', width: 20 },
                        { header: 'Status', key: 'status', width: 10},
          ];
          ExcelUtil.export(this.filteredCustomers,'List Register History',columns,colCenter,[],colRight);
      }
}