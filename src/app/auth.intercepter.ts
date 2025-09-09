import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import AuthService from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const token = localStorage.getItem('access_token');
   const isRefresh = req.url.includes('/api/oauth2/refresh-token');
   const isExchange = req.url.includes('/api/oauth2/exchange-token');
   if (isRefresh || isExchange) {
      return next.handle(req);
   }
   const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
    return next.handle(authReq).pipe(
      catchError(error => {
        if (error.status === 401 && !req.url.includes('/api/oauth2/exchange-token')) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }


   private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap(data => {
          this.isRefreshing = false;
          localStorage.setItem("access_token",data.access_token);
          localStorage.setItem("refresh_token",data.refresh_token);
          this.refreshTokenSubject.next(data.access_token);
          const cloned = request.clone({
            setHeaders: { Authorization: `Bearer ${data.access_token}` }
          });
          return next.handle(cloned);
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.router.navigate(['/oauth2']);
          return EMPTY;
        })
      )
    }else{
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          const cloned = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(cloned);
        })
      )
    }
    
   }
}
