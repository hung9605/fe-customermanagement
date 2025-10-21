import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import User from './user';
import { UserService } from './user.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserformComponent } from './userform/userform.component';
import CommonConstant, { CHART_CONST, Page, TITLE } from '../common/constants/CommonConstant';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChangepassComponent } from './changepass/changepass.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {

  // ===== STATE =====
  isLoading = true;
  sUser !: User[];
  row = environment.rowPanigator;
  searchText: any;
  ref !: DynamicDialogRef;
  filteredUser!: User[] ; 

  // ===== CHART DATA =====
  chartAccount: any;
  dataAccount: number[] = [];
  options1: any;
  readonly page = {
        pageCurrent:Page.CURRENT_ROW,
        rows:Page.ROWS
  }

  readonly columnTitles = [
      { title: 'STT'     , class: 'text-center text-indigo-600', style: 'w-1', field: 'index' }
    , { title: 'Username', class: 'text-left text-indigo-600', style: 'w-3', field: 'username' }
    , { title: 'Email', class: 'text-left text-indigo-600', style: 'w-3', field: 'email' }
    , { title: 'Status'  , class: 'text-center text-indigo-600 pl-5 pr-5', style: 'w-2', field: 'status' }
    , { title: 'Action'  , class: 'text-center text-indigo-600', style: 'w-3', field: 'action' }
  ];

  constructor(private userService: UserService
             ,private dialogService: DialogService
             ,private confirmationService: ConfirmationService
             ,private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userService.listen().subscribe(msg => {
      if(msg == 'reload'){
        this.reloadData();
      }
    });
   
    this.reloadData();

  }

  ngOnDestroy(): void {

  }

  // ===== DATA HANDLERS =====
  private reloadData(): void {
    this.getData();
    this.getDataAccount();
  }

  search(dt1: any) {

    const keyword = this.searchText.toLowerCase().trim();
    this.filteredUser = keyword ? this.sUser.filter(user => user.username?.toLowerCase().includes(keyword)) : [...this.sUser]
    dt1.first = 0;

  }

  searchResult(e: KeyboardEvent, dt1: any) {
    if (e.key === 'Enter') {
      this.search(dt1);
    }
  }

  exportToExcel() {

  }

  getData() {
    this.userService.getList().subscribe({
      next: ({ data }) => {
        this.sUser = data;
        this.filteredUser = data;
        this.isLoading = false;
      },
      error: err => { console.log(err);this.isLoading = false }
    })
  }

  add() {
    this.ref = this.dialogService.open(UserformComponent,{
         header: TITLE.CUSTOMER_DETAIL.TITLE,
         width : TITLE.CUSTOMER_DETAIL.WIDTH,
         data  : {mode:'add',edit:false},
         showHeader: false
    });
  }

  show(data: any) {
    data.mode = 'show';
    data.edit = true;
    this.ref = this.dialogService.open(UserformComponent,{
         header: TITLE.CUSTOMER_DETAIL.TITLE,
         width : TITLE.CUSTOMER_DETAIL.WIDTH,
         data  : data,
         showHeader: false
    });
  }

  lock(data: any){
    this.toggleLock(data,true);
  }

  unlock(data: any){
    this.toggleLock(data,false);
  }

   // ===== USER STATUS =====
  toggleLock(user: User, status: boolean): void {
    const action = status ? 'lock' : 'unlock';
    this.confirmationService.confirm({
      header: 'Are you sure',
      message: `You want to ${action} user ${user.username}?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.userService.updateEnabled({ username: user.username, status: !status }).subscribe({
          next: () => this.userService.close(),
          error: err => console.error(err)
        });
      },
      reject: () => {
        this.messageService.add({severity: 'error',summary: 'Rejected',detail: 'You have rejected',life: 1000
        });
      }
    });
  }

  disable() {

  }

  viewchartAccount() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.chartAccount = {
      labels: [CHART_CONST.TOTAL, CHART_CONST.ACCOUNT_ACTIVE, CHART_CONST.ACCOUNT_NOT_ACTIVE],
      datasets: [
        {
          data: this.dataAccount,
          backgroundColor: [documentStyle.getPropertyValue('--blue-500')
            , documentStyle.getPropertyValue('--green-500')
            , documentStyle.getPropertyValue('--yellow-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400')
            , documentStyle.getPropertyValue('--green-400')
            , documentStyle.getPropertyValue('--yellow-400')]
        }
      ]
    };
    this.options1 = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  changepass(data: any){
     this.ref = this.dialogService.open(ChangepassComponent,{
         header: TITLE.CUSTOMER_DETAIL.TITLE,
         width : TITLE.CUSTOMER_DETAIL.WIDTH,
         data  : data,
         showHeader: false
    });
  }

    getDataAccount() {
      this.dataAccount = [];
      this.userService.getAccount().subscribe({
            next: ({ data }) => {
                this.dataAccount.push(data.total);
                this.dataAccount.push(data.numberActive);
                this.dataAccount.push(data.numberNotActive);
                this.viewchartAccount();
            }
            , error: ({error}) => {
                console.log(error);
            }
        })
    }

    closeDialog(){    
      this.confirmationService.close();
    }


}
