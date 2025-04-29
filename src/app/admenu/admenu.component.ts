import { Component, OnInit } from '@angular/core';
import { AdmenuService } from './admenu.service';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import Menu from '../menu/menu';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdmenuformComponent } from './admenuform/admenuform.component';


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
     {title:'STT',field:'id',style:{'min-width':'100px'},frozen:false,class: 'text-center text-black-alpha-90'}
    ,{title:'Menu Name',field:'label',style:{'min-width':'200px'},frozen:false,class: 'text-black-alpha-90'}
    ,{title:'Icon',field:'icon',style:{'min-width':'100px'},frozen:false}
    ,{title:'Link',field:'link',style:{'min-width':'250px'},frozen:false}
    ,{title:'Status',field:'status',style:{'min-width':'100px'},frozen:false,class: 'text-center text-indigo-600'}
    //,{title:'Parent',field:'idParent',style:{'min-width':'150px'},frozen:false,class: 'text-center'}
    ,{title:'Order Number',field:'orderNumber',style:{'min-width':'100px'},frozen:false ,class: 'text-center text-indigo-600'}
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
  ref !: DynamicDialogRef
  constructor(private adMenuService: AdmenuService
              ,private dialogService:DialogService
              ,private confirmationService: ConfirmationService
              ,private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.adMenuService.listen().subscribe((m:any) =>{
      this.getData();
  });
      
    this.getData();
  }

  search(){

  }

  show(item: any){
    this.ref = this.dialogService.open(AdmenuformComponent, {
      header: 'Menu Detail',
      width: '70vh',
      data: item,
      showHeader: false
    });
  }

  getData(){
    this.adMenuService.getMenu().subscribe({
      next: data => {
        this.data = data.data;
        this.data = this.data.map(item => {
          return {
            ...item,
            idParent: item.idParent == null ? 0 : item.idParent,
            status: item.visible == true ? 'Active':'Not Active'
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

  add(){
    this.ref = this.dialogService.open(AdmenuformComponent, {
      header: 'Create Menu',
      width: '70vh',
      showHeader: false
    });
  }

  delete(data: any){
    this.confirmationService.confirm({
      header: 'Are you sure',
      message: 'You want to delete it?',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
          this.disableMenu(data);
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 1500 });
      }
  });
  }

  disableMenu(data: any){
    console.log(data);
    data.visible = false;
    this.adMenuService.updateVisible(data).subscribe({
      next: data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully!', life: 1500 });
      },
      error: err => {console.log(err);
      }
    });
    
  }

  closeDialog(){

  }
}
