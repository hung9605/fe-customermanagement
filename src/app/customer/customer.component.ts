import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import CustomerDto from './customerDto';
import { CustomerService } from './customer.service';
import StringUtil from '../common/utils/StringUtils';
import { environment } from '../../environments/environment';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormCustomerComponent } from './formcustomer/formcustomer.component';
import { Table } from 'primeng/table';
//import * as XLSX from 'xlsx-style';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { CustomermedicalhistoryComponent } from './customermedicalhistory/customermedicalhistory.component';

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
  isLoading = true;
  @ViewChild('dt', { static: false }) TABLE?: ElementRef;
  columnTitles = [{title:'STT',style:'w-1'},{title:'Full Name',style:'w-3'},
    {title:'Phone Number',style:'w-2'},{title:'Status',style:'w-2'},{title:'Address',style:'w-2'},{title:'Action',style:'w-2'}];
  constructor(private customerService: CustomerService,
              private dialogService: DialogService
  ){
    
  }

  ngOnInit(): void {
    this.page = 0;
    this.list(this.page);
  }

  list(page: number){
    this.isLoading = true;
    this.customerService.getList(page).subscribe({
      next: data => {
        console.log(data);
        
        this.customers = data.data;
        this.customers.map(item =>{
          let nameFormat = item.firstName + " " + item.midName + " " + item.lastName;
          item.fullName = StringUtil.capitalizeFirstLetter(nameFormat ?? "");
          let statusAcconut = item.status == '0' ? true: false;
          item.statusDisplay = statusAcconut;
        });
        setTimeout(() =>{
          this.isLoading = false;
        },500)
      },
      error: err =>{

      }
    });

  }

  show(item: CustomerDto){
    console.log('itemmmm', item);
    
    this.ref = this.dialogService.open(FormCustomerComponent,{
      header: 'Customer Detail',
      width: '100vh',
      data: item
    });
  }

  showHistory(item: CustomerDto){
    console.log('itemmmm', item);
    
    this.ref = this.dialogService.open(CustomermedicalhistoryComponent,{
      header: 'Customer Medical History',
      width: '100vh',
      data: item
    });
  }


  search(){
    
  }


  exportToExcel(){
    const workbook = new ExcelJS.Workbook(); // Create a new workbook
    const worksheet = workbook.addWorksheet('Sheet 1'); // Add a worksheet to the workbook
    worksheet.columns = [
      { header: 'STT', key: 'id', width: 10 },
      { header: 'Full Name', key: 'fullName', width: 20 },
      { header: 'Phone Number', key: 'phoneNumber', width: 15 },
      { header: 'Date Of Birth', key: 'dateOfBirth', width: 20 },
      { header: 'Address', key: 'address', width: 20 },
      { header: 'Status', key: 'status', width: 10 },
      { header: 'Init Dttm', key: 'createdAt', width: 15 },
      { header: 'Init By', key: 'createdBy', width: 15 },
      { header: 'Up Dttm', key: 'UpdatedAt', width: 15 },
      { header: 'Up By', key: 'updatedBy', width: 15 },
    ];
    //style header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' };
    //insert data
    this.customers.forEach(item => {
      const row = worksheet.addRow(item);
      // Format the 'birthDate' column
      const birthDate = new Date(item.dateOfBirth);
      const birthDateCell = row.getCell('D');
      birthDateCell.value = birthDate;
      birthDateCell.numFmt = 'YYYY/MM/DD'; // Format as MM/DD/YYYY
      birthDateCell.alignment = { horizontal: 'center', vertical: 'middle' };
      row.getCell('C').alignment = {horizontal:'right',vertical:'middle'};
      row.getCell('A').alignment = {horizontal:'center',vertical:'middle'};
      row.getCell('F').value = item.status == '0' ?'Active':"Not Active";
      const initDttm = row.getCell('G');
      initDttm.value = new Date(item.createdAt);
      initDttm.numFmt = 'YYYY/MM/DD';
      initDttm.alignment = { horizontal: 'center', vertical: 'middle' };
      const upDttm = row.getCell('I');
      upDttm.value = new Date(item.updatedAt);
      upDttm.numFmt = 'YYYY/MM/DD';
      upDttm.alignment = { horizontal: 'center', vertical: 'middle' };
    });
    // Generate the Excel file buffer
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'Customer.xlsx'); // Trigger the download with file name "example.xlsx"
    });

    
  


}


}