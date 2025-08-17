import { Component } from '@angular/core';
import {
  Router,
  NavigationEnd,
  Event as RouterEvent // 👈 alias để tránh xung đột với DOM Event
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showHeaderAndMenu = true;

  constructor(private router: Router){

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
          //this.router.navigate(['/oauth2']); // Chuyển về trang login
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

}
