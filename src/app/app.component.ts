import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  Event as RouterEvent
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { filter } from 'rxjs';
import AuthService from './auth.service';
import { NotiService } from './noti.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit,OnDestroy {

  showHeaderAndMenu = false;
  notifications: { title: string; content: string; time?: string }[] = [];
  unreadCount: number = 0;

  ngOnInit(): void {
    this.authService.tokenRefreshed$.subscribe(isOk => {
      this.showHeaderAndMenu = isOk;
    });
    this.notify.connect();
    this.notify.subscribe('/topic/notifications', (msg) => {
      this.notifications.unshift(msg);
      this.unreadCount++;
       this.messageService.add({
        severity: 'info',
        summary: 'Thông báo mới',
        detail: msg.content || 'Bạn có thông báo mới!',
        life: 1000   // thời gian hiển thị (ms)
      });
    });
  }

  constructor( private router: Router
              ,private authService: AuthService
              ,private notify: NotiService
              ,private messageService: MessageService
  ){
    this.showHeaderAndMenu = this.isTokenValid();
    this.router.events
    .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
    .subscribe((event) => {
      const navEndEvent = event as NavigationEnd;
      const hiddenRoutes = ['/ogranization'];
      this.showHeaderAndMenu = !hiddenRoutes.includes(navEndEvent.urlAfterRedirects);
       if (this.showHeaderAndMenu && !this.isTokenValid()) {
          console.warn('Token expired or invalid → Hiding header & menu');
          this.showHeaderAndMenu = false;
        }
    });
  }

  private isTokenValid(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
      try {
        const decoded: any = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        return !decoded.exp || decoded.exp > now; // Nếu không có exp thì coi là hợp lệ
      } catch (e) {
        console.error('Invalid token:', e);
        return false;
      }
   }

   ngOnDestroy(): void {
      this.notify.disconnect();
   }

}
