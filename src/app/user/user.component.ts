import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit,OnDestroy {

  isLoading = true;
  sUser: any[] = [];
  row = environment.rowPanigator;
  searchInput:any;
  readonly columnTitles = [
           {title:'STT',class:'text-center text-black-alpha-90',classHeader:'w-1', field: 'index'}
          ,{title:'Username',class:'text-left text-black-alpha-90',classHeader:'w-3',field:'username'}
          ,{title:'Password',class:'text-right text-indigo-600',classHeader:'w-5',field:'password'}
          ,{title:'Status',class:'text-center text-indigo-600',classHeader:'w-1',field:'status'}
          ,{title:'Action',class:'text-center text-indigo-600',classHeader:'w-2',field:'status'}
        ];

  ngOnInit(): void {
    this.isLoading = false;
    
  }

  ngOnDestroy(): void {
    
  }

  search(dt1: any){

  }

    searchResult(e:KeyboardEvent,dt1:any){
    if (e.key === 'Enter') {
      this.search(dt1);
    }
  }

  exportToExcel(){

  }



}
