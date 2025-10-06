import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import CustomerDto, { ChartData } from './customerDto';
import { CustomerService } from './customer.service';
import StringUtil from '../common/utils/StringUtils';
import { environment } from '../../environments/environment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormCustomerComponent } from './formcustomer/formcustomer.component';
import { CustomermedicalhistoryComponent } from './customermedicalhistory/customermedicalhistory.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import CommonConstant, { TITLE } from '../common/constants/CommonConstant';
import { Router } from '@angular/router';
import ExcelUtil from '../common/utils/ExcelUtil';
import { getChartColors, setOptionBar } from '../common/constants/Chart';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{
  customers!: CustomerDto[];
  customersExport!: any[];
  page = 0;
  row = environment.rowPanigator;
  dataDialog !: any;
  checked = true;
  readonly columnTitleExcel = ['STT','Full Name','Phone Number','Status','Address','Init Dttm','InitBy','Up Dttm','Up By'];
  readonly columnDataExcel = ['id','fullName','phoneNumber','status','address','initDttm','InitBy','upDttm','upBy' ];
  isLoading = true;
  readonly columnTitles = [
     {title:'STT',style:'w-1'}
    ,{title:'Full Name',style:'w-3'}
    ,{title:'Phone Number',style:'w-2'}
    ,{title:'Status',style:'w-1'}
    ,{title:'Address',style:'w-3'}
    ,{title:'Action',style:'w-2'}
  ];
  searchText: string = '';
  filteredCustomers: any[] = this.customers;
  ref!: DynamicDialogRef;
  chartCustomer: any;
  labelChart: string[] = [];
  valueChart!: number[];
  options: any;
  constructor(private customerService: CustomerService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router:Router
  ){}

  ngOnInit(): void {
    this.list(this.page);
    this.getDataChart();
  }

  list(page: number){
    this.customerService.getList(page).subscribe({
    next:data=> {
    this.customers = data.data;
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
    this.isLoading = false;
  }
});
}
  show(item: CustomerDto){
    this.ref = this.dialogService.open(FormCustomerComponent,{
      header: TITLE.CUSTOMER_DETAIL.TITLE,
      width: TITLE.CUSTOMER_DETAIL.WIDTH,
      data: item
    });
  }

  showHistory(item: CustomerDto){
    this.ref = this.dialogService.open(CustomermedicalhistoryComponent,{
      header: TITLE.CUSTOMER_HISTORY.TITLE,
      width: TITLE.CUSTOMER_HISTORY.WIDTH,
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
    console.log('item',item);

    if(item?.status == 1){
      this.messageService.add({ severity: 'warn', summary: 'Warning'
      ,detail: 'Account not active <br> Please active before register medical examination !', life: 1000 });
      return;
    }

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
    let sMedical = {
      fullName: item.fullName,
      timeRegister: StringUtil.getCurTime(),
      status: 0,
      phoneNumber:item.phoneNumber,
      customer:{
        id:item.id
      }
    }

    this.customerService.addScheduleMedicalExistsCustomer(sMedical).subscribe({
      next: data =>{
        this.messageService.add({ severity: CommonConstant.SUCCESS, summary: CommonConstant.SUCCESS_TITLE, detail:"Add customer successfully", life: 1000 });
        setTimeout(() =>{
          this.router.navigate(['/listregister']);
        },500)
      },
      error: err =>{
        this.messageService.add({ severity: CommonConstant.ERROR, summary: CommonConstant.REJECTED_MESSAGE, detail: err.error.data, life: 1000 });
      }
    })

  }

  closeDialog(){
    this.confirmationService.close();
  }

  exportToExcel() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.customersExport = this.customers.map(c => ({
      ...c,
      dateOfBirth: c.dateOfBirth ? new Date(c.dateOfBirth) : null,
      createdAt: c.createdAt ? new Date(c.createdAt) : null,
      updatedAt: c.updatedAt ? new Date(c.updatedAt) : null,
      status: c.status == CommonConstant.ZERO ?CommonConstant.ACTIVE:CommonConstant.NOT_ACTIVE
    }));
    setTimeout(() => {
      try {
        const colCenter = ['dateOfBirth', 'status','createdAt','updatedAt'];
        const colRight = ['phoneNumber'];
        const columns = [
          { header: 'STT', key: 'index', width: 10 },
          { header: 'Full Name', key: 'fullName', width: 20 },
          { header: 'Phone Number', key: 'phoneNumber', width: 15 },
          { header: 'Date Of Birth', key: 'dateOfBirth', width: 20 , style: { numFmt: 'yyyy/mm/dd' }},
          { header: 'Address', key: 'address', width: 20 },
          { header: 'Status', key: 'status', width: 10 },
          { header: 'Init Dttm', key: 'createdAt', width: 15, style: { numFmt: 'yyyy/mm/dd' }},
          { header: 'Init By', key: 'createdBy', width: 15 },
          { header: 'Up Dttm', key: 'updatedAt', width: 15, style: { numFmt: 'yyyy/mm/dd' } },
          { header: 'Up By', key: 'updatedBy', width: 15 },
        ];
        ExcelUtil.export(this.customersExport, 'Customer', columns, colCenter, [], colRight);
        this.messageService.add({ severity: CommonConstant.SUCCESS, summary: CommonConstant.SUCCESS_TITLE, detail: "Export Successfully !", life: 1000 });
      } catch (error) {
        console.error('Export to Excel failed:', error);
        this.messageService.add({ severity: CommonConstant.ERROR, summary: CommonConstant.ERROR_TITLE, detail: "Export Fail !", life: 1000 });
      } finally {
        this.isLoading = false; 
      }
    }, 500);
  }

  getDataChart(){

    this.customerService.getCustomerChart().subscribe({
      next: ({data}) => {
        const dataChart: ChartData[] = data;
        this.labelChart = [...new Set(dataChart.map(item => item.month))];
        this.valueChart = [...new Set(dataChart.map(item => item.total))];
        this.initChart();
      },
      error: arr => {}
    })

  }
 initChart() {
        const { textColor, textColorSecondary, surfaceBorder,documentStyle } = getChartColors();
        this.chartCustomer = {
            labels: this.labelChart,
            datasets: [
                {
                    type: 'bar',
                    label: 'Number Customer',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: this.valueChart
                }
            ]
        };
        this.options = setOptionBar(textColor, textColorSecondary, surfaceBorder);
    }


}