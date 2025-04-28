import { Component, OnInit } from '@angular/core';
import Menu from '../../menu/menu';
import { FormControl, FormGroup } from '@angular/forms';
import { AdmenuService } from '../admenu.service';
import { MessageService } from 'primeng/api';
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
                  private dialogConfig:DynamicDialogConfig
      ){}
  
      ngOnInit(): void {
        this.data = this.dialogConfig.data;
        console.log('this.data.menu', this.data);
        
        this.menuForm = new FormGroup({
            id      :  new FormControl(this.data?.id),
            label   :  new FormControl(this.data?.label),
            icon    :  new FormControl(this.data?.icon),
            link    :  new FormControl(this.data?.link),
            parent  :  new FormControl<Menu|null>(null)
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
            idParent: objreq?.idParent || null // Default value
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
  
}