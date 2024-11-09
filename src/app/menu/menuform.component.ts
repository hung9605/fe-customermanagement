import { Component, OnInit } from '@angular/core';
import Menu from './menu';
import { MenuService } from './menu.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menuform',
  templateUrl: './menuform.component.html',
  styleUrl: './menuform.component.scss'
})
export class MenuFormComponent implements OnInit{

    menus:Menu[] = [];

    menuForm = new FormGroup({
        label: new FormControl(''),
        icon: new FormControl(''),
        link: new FormControl(''),
        parent: new FormControl<Menu|null>(null)
    });

    constructor(private menuService:MenuService,
        private messageService:MessageService
    ){}

    ngOnInit(): void {
        this.menuService.getMenu().subscribe({
            next: data => {
                this.menus = data.data;
            }
        });
    }

    addmenu(){
        const objreq = <Menu>this.f.parent.value;
        let obj = {};
        if(null != objreq){
            obj = {
                label: this.f.label.value,
                icon: this.f.icon.value,
                link: this.f.link.value,
                idParent:objreq.id
            }
        }else{
            obj = {
                label: this.f.label.value,
                icon: this.f.icon.value,
                link: this.f.link.value,
                idParent: null
            }
        }
        this.menuService.addMenu(obj).subscribe({
           next: data => {
            this.menuForm.reset();
            this.messageService.add({severity:'success',summary:'Success',detail:'Them thanh cong'});
           },
           error: data => {
            this.messageService.add({severity:'error',summary:'Error',detail:data});
           } 
        });
    }

    get f(){return this.menuForm.controls;}



}
