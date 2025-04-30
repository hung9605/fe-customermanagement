import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuService } from './menu.service';
import Menu from './menu';
import { ShareService } from '../admenu/share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  
  encapsulation: ViewEncapsulation.None 
})
export class MenuComponent implements OnInit,OnDestroy {

  items !: MenuItem[];
  private subscription: Subscription;

  constructor(private router:Router,
              private menuService:MenuService,
              private shareService: ShareService
  ){
    this.subscription = this.shareService.listen().subscribe(data => {
      if (data == 'reload') {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData(){
    this.menuService.getMenu().subscribe({
      next: data=>{
        this.items = this.formatMenu(data.data, null);  
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
        idParent: i.idParent,
        visible: i.visible
      }
      itemRes.push(tg);
    }
  })
  return itemRes;
}



}
