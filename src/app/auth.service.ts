import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  private isHandling401 = false;
  private apiUrl = 'http://localhost:8085/api/oauth2';
  tokenRefreshed$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient){

  }

  getHandling401(): boolean {
    return this.isHandling401;
  }

  setHandling401(value: boolean): void {
    this.isHandling401 = value;
  }

  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  
  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap((res) => {
        this.saveTokens(res.access_token, res.refresh_token);
        this.tokenRefreshed$.next(true);
        this.setHandling401(false);
      }),
      catchError((err) => {
        console.error('Refresh token failed', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.setHandling401(false);
        return throwError(() => err);
      })
    );
  }
}
