import { Component, OnInit, ViewChild } from '@angular/core';
import CustomerDto from './customerDto';
import { CustomerService } from './customer.service';
import StringUtil from '../common/utils/StringUtils';
import { environment } from '../../environments/environment';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormCustomerComponent } from './formcustomer/formcustomer.component';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{
  customers!: CustomerDto[];
  page!: number;
  row = environment.rowPanigator;
  ref !: DynamicDialogRef;
  dataDialog !: any;
  checked = true;
  columnTitleExcel = ['STT','Full Name','Phone Number','Status','Address','Init Dttm','InitBy','Up Dttm','Up By'];
  columnDataExcel = ['id', 'fullName' , ' phoneNumber','status','address','initDttm','InitBy','upDttm','upBy' ];
  @ViewChild('dt') dt: Table | undefined; 
  constructor(private customerService: CustomerService,
              private dialogService: DialogService
  ){
    
  }

  ngOnInit(): void {
    this.page = 0;
    this.list(this.page);
  }

  list(page: number){
    this.customerService.getList(page).subscribe({
      next: data => {
        console.log(data);
        
        this.customers = data.data;
        this.customers.map(item =>{
          let nameFormat = item.firstName + " " + item.midName + " " + item.lastName;
          item.fullName = StringUtil.capitalizeFirstLetter(nameFormat ?? "");
          let statusAcconut = item.status == '0' ? true: false;
          item.statusDisplay = statusAcconut;
        })
      },
      error: err =>{

      }
    });

  }

  show(item: CustomerDto){
    console.log('itemmmm', item);
    
    this.ref = this.dialogService.open(FormCustomerComponent,{
      header: 'Customer',
      width: '100vh',
      data: item
    });
  }

  exportToExcel1(table: Table){
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customers);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
  }

  exportToExcel(){

    
    const selectedColumns = this.customers.map(item => ({
      STT: item.id,
      FullName: item.fullName,
      "Date Of Birth": item.dateOfBirth,
      Address: item.address,
      Status: item.status == '0'?'Active':'Not Active',
      "Init Dttm":item.initDttm,
      "Init By": item.initBy,
      "Up Dttm": item.upDttm,
      "Up By": item.upBy
    }));

    // Create a worksheet from the selected columns
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedColumns);

    // Create a workbook from the worksheet
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };

    // Export the workbook as an Excel file
    XLSX.writeFile(wb, 'exported_data.xlsx');
    
  }

}