import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuService } from './menu.service';
import Menu from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  
  encapsulation: ViewEncapsulation.None 
})
export class MenuComponent implements OnInit {

  items !: MenuItem[];

  constructor(private router:Router,
              private menuService:MenuService
  ){

  }

  ngOnInit(): void {

    this.menuService.getMenu().subscribe({
      next: data=>{
        this.items = this.formatMenu(data.data, null);  
        console.log('this.items',this.items);
        
      }
    });
    
  }

formatMenu(items: Menu[], parentId: any){
  let itemRes: MenuItem[] = [];
  items.forEach( i => {
    if(i.idParent == parentId){
      let tg:MenuItem = {
        id: i.id,
        label: i.label,
        icon: i.icon,
        routerLink: i.link,
        routerLinkActiveOptions: false,
        items: this.formatMenu(items, i.id),
        idParent: i.idParent
      }
      itemRes.push(tg);
    }
  })
  return itemRes;
}



}
