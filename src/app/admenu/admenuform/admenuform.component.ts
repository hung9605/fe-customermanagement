import { Component, OnInit } from '@angular/core';
import Menu from '../../menu/menu';
import { FormControl, FormGroup } from '@angular/forms';
import { AdmenuService } from '../admenu.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-admenuform',
  templateUrl: './admenuform.component.html',
  styleUrl: './admenuform.component.scss'
})
export class AdmenuformComponent implements OnInit{


      menus:Menu[] = [];
      srcImage = environment.SRC_IMAGE;
  
      menuForm !: FormGroup;
      data: any;
  
      constructor(private menuService:AdmenuService,
                  private messageService:MessageService,
                  private ref: DynamicDialogRef,
                  private dialogConfig:DynamicDialogConfig,
                  private confirmationService: ConfirmationService
      ){}
  
      ngOnInit(): void {
        this.data = this.dialogConfig.data;
        console.log('this.data.menu', this.data);
        
        this.menuForm = new FormGroup({
            id             :  new FormControl(this.data?.id),
            label          :  new FormControl(this.data?.label),
            icon           :  new FormControl(this.data?.icon),
            link           :  new FormControl(this.data?.link),
            status         :  new FormControl(this.data?.status == 'Active'?true:false),
            orderNumber    :  new FormControl(this.data?.orderNumber),
            parent         :  new FormControl<Menu|null>(null),
            createdBy      :  new FormControl(this.data?.createdBy),
            createdAt      :  new FormControl(this.data?.createdAt),
        });
          this.menuService.getMenu().subscribe({
              next: data => {
                  this.menus = data.data;
                  if(this.data?.idParent != 0){
                    const parentMenu = this.menus.find((menu) => menu.id === this.data?.idParent);
                    this.menuForm.patchValue({
                        parent:parentMenu
                    })
                    
                  }
              }
          });
      }
  
      addmenu(){
          const objreq = <Menu>this.f['parent'].value;
          let obj = {
            id: this.f['id'].value,
            label: this.f['label'].value,
            icon: this.f['icon'].value,
            link: this.f['link'].value,
            visible: this.f['status'].value,
            orderNumber: this.f['orderNumber'].value,
            idParent: objreq?.id || null // Default value
          };            
          this.menuService.addMenu(obj).subscribe({
             next: data => {
              this.menuForm.reset();
              this.messageService.add({severity:'success',summary:'Success',detail:'Thêm thành công' + data.data.label});
              setTimeout(()=>{
                this.menuService.closeDialog();
                this.ref.close();
              },500)
              
              
             },
             error: data => {
              this.messageService.add({severity:'error',summary:'Error',detail:data});
             } 
          });
      }
  
      get f(){return this.menuForm.controls;}


      cancel(){
        this.ref.close();
      }

      deleteMenu(){

        this.confirmationService.confirm({
          header: 'Are you sure',
          message: 'You want to delete it?',
          key:'dialogForm',
          acceptIcon: 'pi pi-check mr-2',
          rejectIcon: 'pi pi-times mr-2',
          rejectButtonStyleClass: 'p-button-sm',
          acceptButtonStyleClass: 'p-button-outlined p-button-sm',
          accept: () => {
              this.menuService.deleteMenu(this.data).subscribe({
                next: data => {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete ' + this.data.label+ ' Successfully!', life: 1500 });
                  this.ref.close();
                  this.menuService.closeDialog();
                },
                error: err => {}
              })
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 1500 });
          }
      });

      }

      closeDialog(){
        this.confirmationService.close();
      }
  
}