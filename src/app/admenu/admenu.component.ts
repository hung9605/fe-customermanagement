import { Component, OnInit } from '@angular/core';
import { AdmenuService } from './admenu.service';
import { TreeNode } from 'primeng/api';
import Menu from '../menu/menu';


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-admenu',
  templateUrl: './admenu.component.html',
  styleUrl: './admenu.component.scss'
})
export class AdmenuComponent implements OnInit {

  columnTitles = [
     {title:'STT',field:'id',style:{'min-width':'100px'},frozen:false,class: 'text-center'}
    ,{title:'Menu Name',field:'label',style:{'min-width':'200px'},frozen:false}
    ,{title:'Icon',field:'icon',style:{'min-width':'100px'},frozen:false}
    ,{title:'Link',field:'link',style:{'min-width':'250px'},frozen:false}
    //,{title:'Status',field:'status',style:{'min-width':'100px'},frozen:false}
    ,{title:'Parent',field:'idParent',style:{'min-width':'150px'},frozen:false,class: 'text-center'}
    ,{title:'Order Number',field:'orderNumber',style:{'min-width':'100px'},frozen:false ,class: 'text-center'}
    ,{title:'Created By',field:'createdBy',style:{'min-width':'150px'},frozen:false}
    ,{title:'Created At',field:'createdAt',style:{'min-width':'150px'},frozen:false}
    ,{title:'Updated By',field:'updatedBy',style:{'min-width':'150px'},frozen:false}
    ,{title:'Updated At',field:'updatedAt',style:{'min-width':'150px'},frozen:false}
    ,{title:'Action',field:'action',style:{'min-width':'100px'},frozen:false,class: 'text-center'}
  ];
  isLoading = false;
  row = 10;
  menus: TreeNode[] = [];
  data: Menu[] = [];
  cols!: Column[];
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
        this.data = data.data;
        this.data = this.data.map(item => {
          return {
            ...item,
            idParent: item.idParent == null ? 0 : item.idParent
          };
        });
        this.menus = this.formatMenu(this.data,0);
      },
      error: err => {console.log(err);
      }
    })
  }

  formatMenu(items: Menu[], parentId: any){
    let itemRes: TreeNode[] = [];
    items.forEach( i => {
      if(i.idParent == parentId){
        let tg:TreeNode = {
          key: i.id,
          data: i,
          children: this.formatMenu(items, i.id),
          parent:parentId,
          expanded: false
        }
        itemRes.push(tg);
      }
    })
    return itemRes;
  }
}
