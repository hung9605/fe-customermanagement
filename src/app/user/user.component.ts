import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import User from './user';
import { UserService } from './user.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserformComponent } from './userform/userform.component';
import { TITLE } from '../common/constants/CommonConstant';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {

  isLoading = true;
  sUser !: User[];
  row = environment.rowPanigator;
  searchInput: any;
  chartAccount: any;
  dataAccount: Number[] = [];
  options1: any;
  ref !: DynamicDialogRef
  readonly columnTitles = [
      { title: 'STT'     , class: 'text-center text-indigo-600', style: 'w-1', field: 'index' }
    , { title: 'Username', class: 'text-left text-indigo-600', style: 'w-3', field: 'username' }
    , { title: 'Email', class: 'text-left text-indigo-600', style: 'w-3', field: 'email' }
    , { title: 'Status'  , class: 'text-center text-indigo-600 pl-5 pr-5', style: 'w-2', field: 'status' }
    , { title: 'Action'  , class: 'text-center text-indigo-600', style: 'w-3', field: 'action' }
  ];

  constructor(private userService: UserService
             ,private dashboardService: DashboardService
             ,private dialogService: DialogService
  ) {

  }

  ngOnInit(): void {
   
    this.getData();
    this.getDataAccount();

  }

  ngOnDestroy(): void {

  }

  search(dt1: any) {

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
        this.isLoading = false;
      },
      error: err => { console.log(err);this.isLoading = false }
    })
  }

  add() {
    this.ref = this.dialogService.open(UserformComponent,{
         header: TITLE.CUSTOMER_DETAIL.TITLE,
         width : TITLE.CUSTOMER_DETAIL.WIDTH,
         data  : {},
         showHeader: false
    });
  }

  show() {

  }

  disable() {

  }

  viewchartAccount() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.chartAccount = {
      labels: ['Total', 'Account Active', 'Account Not Active'],
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

    getDataAccount() {
        this.userService.getAccount().subscribe({
            next: ({ data }) => {
                this.dataAccount.push(data.total);
                this.dataAccount.push(data.numberActive);
                this.dataAccount.push(data.numberNotActive);
                this.viewchartAccount();
            }
            , error: err => {
                console.log(err);
            }
        })
    }


}
