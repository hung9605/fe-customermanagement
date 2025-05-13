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
         {title:'STT',class:'w-1 text-center text-black-alpha-90',classHeader:'w-1', field: 'index'}
        ,{title:'Full Name',class:'w-3 text-left text-black-alpha-90',classHeader:'w-3',field:'fullName'}
        ,{title:'Phone Number',class:'w-2 text-right text-indigo-600',classHeader:'w-2',field:'phoneNumber'}
        ,{title:'Gender',class:'w-2 text-center text-indigo-600',classHeader:'w-1',field:'gender'}
        ,{title:'Date Register',class:'w-2 text-center text-indigo-600',classHeader:'w-2',field:'dateRegister'}
        ,{title:'Time Register',class:'w-1 text-center text-indigo-600',classHeader:'w-1',field:'timeRegister'}
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
    
      show(obj: any){
        // obj.idSchedule = obj.customer.id;
        // console.log('objtest',obj);
        // this.ref = this.dialogService.open(SchedulemedicalComponent,{
        //   header:'Customer Register',
        //   width: '70%',
        //   data: obj,
        //   showHeader: false
        // })
    
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
            console.log('filteredCustomers',this.filteredCustomers);
            
            this.isLoading = false;
            setTimeout(() =>{
              this.isLoading = false;
            },500)
          },
          error: err => {
            console.log(err);
            this.isLoading = false;
          }
        })
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