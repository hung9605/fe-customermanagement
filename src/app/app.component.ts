import { Component } from '@angular/core';
import {
  Router,
  NavigationEnd,
  Event as RouterEvent // 👈 alias để tránh xung đột với DOM Event
} from '@angular/router';

import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showHeaderAndMenu = true;

  constructor(private router: Router){

    this.router.events
    .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
    .subscribe((event) => {
      const navEndEvent = event as NavigationEnd;
      const hiddenRoutes = ['/ogranization'];
      this.showHeaderAndMenu = !hiddenRoutes.includes(navEndEvent.urlAfterRedirects);
    });

  }

}
