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

     // Set the column widths
     const wscols = [
      { wpx: 60 }, 
      { wpx: 120 }, 
      { wpx: 120 }, 
      { wpx: 120 }, 
      { wpx: 80 }, 
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
    ];
    // Apply the column widths to the worksheet
    ws['!cols'] = wscols;

    // Define the header alignment style (center)
    const headerStyle = {
      alignment: { vertical: 'center', horizontal: 'center' },
      font: { italic: true }  // Make the header text bold (optional)
    };

    const headerCells = ['A1', 'B1', 'C1','D1','E1','F1','G1','H1','I1'];
    headerCells.forEach(cell => {
      if (ws[cell]) {
        ws[cell].s = headerStyle;  // Apply the style to header cells
      }
    })
    console.log('wsssss', ws);

    // Define alignment for data cells (center)

    const dataStyle = {
      alignment: { horizontal: 'center', vertical: 'center' }, // Center alignment
    };


    
    // Create a workbook from the worksheet
    const wb: XLSX.WorkBook = { Sheets: { 'Sheet1': ws }, SheetNames: ['Sheet1'] };

    // Export the workbook as an Excel file
    XLSX.writeFile(wb, 'listcustomer.xlsx');
    
  }

}