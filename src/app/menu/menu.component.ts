import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuService } from './menu.service';
import Menu from './menu';
import { ShareService } from '../admenu/share.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../oauth2/jwtdecode';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class MenuComponent implements OnInit,OnDestroy {

  items !: MenuItem[];
  private subscription !:Subscription;
  private destroy$ = new Subject<void>();

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
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(){
    this.menuService.getMenu().pipe(takeUntil(this.destroy$)).subscribe({
      next: data=>{
        console.log('data.data',data.data);
        
        this.items = this.formatMenu(data.data, null);  
        console.log('this.items', this.items);
        
      }
    });
  }

formatMenu(items: Menu[], parentId: any): MenuItem[] {
  const token = localStorage.getItem('access_token');
  const decoded = token ? jwtDecode<JwtPayload>(token) : { roles: [] as string[] };
  const userRoles = decoded.roles || [];
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
      visible: item.visible && userRoles.includes(item.role)
    }));
}



}