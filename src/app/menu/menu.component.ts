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
  private subscription !:Subscription;

  constructor(private router:Router,
              private menuService:MenuService,
              private shareService: ShareService
  ){
   
  }

  ngOnInit(): void {
    this.subscription = this.shareService.listen().subscribe(data => {
      if (data == 'reload') {
        this.loadData();
      }
    });
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

formatMenu(items: Menu[], parentId: any): MenuItem[] {
  return items
    .filter(item => item.idParent === parentId)
    .map(item => ({
      id: item.id,
      label: item.label,
      icon: item.icon,
      routerLink: item.link,
      routerLinkActiveOptions: false,
      items: this.formatMenu(items, item.id),
      idParent: item.idParent,
      visible: item.visible
    }));
}

}