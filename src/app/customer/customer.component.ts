import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import CustomerDto from './customerDto';
import { CustomerService } from './customer.service';
import StringUtil from '../common/utils/StringUtils';
import { environment } from '../../environments/environment';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormCustomerComponent } from './formcustomer/formcustomer.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { CustomermedicalhistoryComponent } from './customermedicalhistory/customermedicalhistory.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import CommonConstant from '../common/constants/CommonConstant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{
  customers!: CustomerDto[];
  page!: number;
  row = environment.rowPanigator;
  dataDialog !: any;
  checked = true;
  columnTitleExcel = ['STT','Full Name','Phone Number','Status','Address','Init Dttm','InitBy','Up Dttm','Up By'];
  columnDataExcel = ['id','fullName','phoneNumber','status','address','initDttm','InitBy','upDttm','upBy' ];
  isLoading = true;
  columnTitles = [
     {title:'STT',style:'w-1'}
    ,{title:'Full Name',style:'w-3'}
    ,{title:'Phone Number',style:'w-2'}
    ,{title:'Status',style:'w-2'}
    ,{title:'Address',style:'w-2'}
    ,{title:'Action',style:'w-2'}
  ];
  searchText: string = '';
  filteredCustomers: any[] = this.customers;
  ref!: DynamicDialogRef;
  constructor(private customerService: CustomerService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router:Router
  ){}

  ngOnInit(): void {
    this.page = 0;
    this.list(this.page);
  }

  list(page: number){
    this.isLoading = true;
    // this.customerService.getList(page).subscribe({
    //   next: data => {
    //     this.customers = data.data;
    //     this.customers.map(item =>{
    //       let nameFormat = item.firstName + " " + item.midName + " " + item.lastName;
    //       item.fullName = StringUtil.capitalizeFirstLetter(nameFormat ?? "");
    //       let statusAcconut = item.status == CommonConstant.ZERO ? true: false;
    //       item.statusDisplay = statusAcconut;
    //     });
    //     this.filteredCustomers = this.customers;
    //     setTimeout(() =>{
    //       this.isLoading = false;
    //     },100)
    //   },
    //   error: err =>{

    //   }
    // });

    this.customerService.getList(page).subscribe({
  next:data=> {
    this.customers = data.data;
    console.log(' this.customers',  this.customers);
    
    this.customers = this.customers.map(item => {
      return {
        ...item,
        fullName:StringUtil.capitalizeFirstLetter([item.firstName,item.midName,item.lastName].filter(Boolean).join(' ')),
        statusDisplay: item.status == CommonConstant.ZERO
      };
    });

    this.filteredCustomers = this.customers;
    
    this.isLoading = false;
  },
  error: (err) => {
    console.error('Error loading customer list:', err);
    this.isLoading = false; // đảm bảo loading dừng nếu có lỗi
  }
});




  }

//   getCustomerList(page: number): void {
//   this.isLoading = true;

//   this.customerService.getList(page).pipe(
//     map(response => response.data.map(item => ({
//       ...item,
//       fullName: StringUtil.capitalizeFirstLetter(
//         [item.firstName, item.midName, item.lastName].filter(Boolean).join(' ')
//       ),
//       statusDisplay: item.status === CommonConstant.ZERO
//     }))),
//     tap(processedData => {
//       this.customers = processedData;
//       this.filteredCustomers = [...processedData];
//     }),
//     catchError(err => {
//       console.error('Error fetching customer list:', err);
//       this.notificationService.showError('Không thể tải danh sách khách hàng. Vui lòng thử lại sau.');
//       return of([]); // Trả về mảng rỗng để không làm app crash
//     }),
//     finalize(() => {
//       this.isLoading = false;
//     })
//   ).subscribe();
// }


  show(item: CustomerDto){
    this.ref = this.dialogService.open(FormCustomerComponent,{
      header: 'Customer Detail',
      width: '100vh',
      data: item
    });
  }

  showHistory(item: CustomerDto){
    this.ref = this.dialogService.open(CustomermedicalhistoryComponent,{
      header: 'Customer Medical History',
      width: '70%',
      data: item
    });
  }


  search(dt1: any){
    if (this.searchText.trim() === '') {
      // Nếu không có tìm kiếm, hiển thị tất cả dữ liệu
      this.filteredCustomers = this.customers;
    } else {
      // Lọc dữ liệu theo từ khóa tìm kiếm
      this.filteredCustomers = this.customers.filter(customer => 
        customer.fullName?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    dt1.first = 0; // Reset pagination to the first page after search
    
  }

  searchResult(e:KeyboardEvent,dt1:any){
    if (e.key === 'Enter') {
      this.search(dt1);
    }
  }

  addExam(item: any){
    // console.log('add new exam');
    // console.log('item',item);

    this.confirmationService.confirm({
      header: 'Are you sure',
      message: 'You want to add new examination?',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
          this.add(item);
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 1000 });
      }
  });
    

  }

  add(item: any){

    let time = new Date().toLocaleTimeString();
    const time24hNoSeconds = new Date().toLocaleTimeString('vi-VN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh'
    });
    console.log('time24hNoSeconds',time24hNoSeconds);
    
    let sMedical = {
      fullName: item.fullName,
      timeRegister: time24hNoSeconds,
      status: 0,
      phoneNumber:item.phoneNumber,
      customer:{
        id:item.id
      }
    }

    console.log('sMedical', sMedical);
    this.customerService.addScheduleMedicalExistsCustomer(sMedical).subscribe({
      next: data =>{
        setTimeout(() =>{
          this.router.navigate(['/listregister']);
        })
      },
      error: err =>{
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err.error.data, life: 1000 });
      }
    })

  }

  closeDialog(){
    this.confirmationService.close();
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