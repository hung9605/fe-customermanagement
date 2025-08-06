import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import AuthService from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    if (this.authService.getHandling401() && !req.url.includes('/api/oauth2/exchange-token')) {
      console.warn('Blocked request while handling 401:', req.url);
      return EMPTY;
    }
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;
    console.log('reqqqq',req);
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (!this.authService.getHandling401()) {
            this.authService.setHandling401(true);
            console.warn('401 Unauthorized - redirecting to login');
            this.router.navigate(['/oauth2']);
            return EMPTY;
          }
        }
        return throwError(() => error);
      })
    );
  }
}
