import { Component, OnInit } from '@angular/core';
import { AdmenuService } from './admenu.service';

@Component({
  selector: 'app-admenu',
  templateUrl: './admenu.component.html',
  styleUrl: './admenu.component.scss'
})
export class AdmenuComponent implements OnInit {

  columnTitles = [
     {title:'STT',style:{'min-width':'50px'},frozen:false}
    ,{title:'Menu Name',style:{'min-width':'200px'},frozen:false}
    ,{title:'Icon',style:{'min-width':'100px'},frozen:false}
    ,{title:'Link',style:{'min-width':'100px'},frozen:false}
    ,{title:'Status',style:{'min-width':'100px'},frozen:false}
    ,{title:'Parent',style:{'min-width':'100px'},frozen:false}
    ,{title:'Order Number',style:{'min-width':'100px'},frozen:false}
    ,{title:'Created By',style:{'min-width':'100px'},frozen:false}
    ,{title:'Created At',style:{'min-width':'100px'},frozen:false}
    ,{title:'Updated By',style:{'min-width':'100px'},frozen:false}
    ,{title:'Updated At',style:{'min-width':'100px'},frozen:false}
    ,{title:'Action',style:{'min-width':'100px'},frozen:false}
  ];
  isLoading = false;
  row = 10;
  menus: any;
  constructor(private adMenuService: AdmenuService){}

  ngOnInit(): void {
    this.getData();
  }

  search(){

  }

  show(item: any){
    
  }

  getData(){
    this.adMenuService.getMenu().subscribe({
      next: data => {
        this.menus = data.data;
      },
      error: err => {console.log(err);
      }
    })
  }
}
