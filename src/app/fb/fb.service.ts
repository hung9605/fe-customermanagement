import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FbService {

  private fbLoaded = false;

  constructor(){}

  private loadSDK(): Observable<void> {
    if (this.fbLoaded) {
      return from([undefined]);
    }

    return new Observable<void>((observer) => {
      const script = document.createElement('script');
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.onload = () => {
        (window as any).FB.init({
          appId: '720969939674310',
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
        this.fbLoaded = true;
        observer.next();
        observer.complete();
      };
      script.onerror = (err) => observer.error(err);
      document.body.appendChild(script);
    });
  }

  login(): Observable<string> {
    console.log('FB'+(window as any).FB);
    return this.loadSDK().pipe( 
      switchMap(() => new Observable<string>((observer) => {
        (window as any).FB.login((response: any) => {
          if (response.authResponse) {
            observer.next(response.authResponse.accessToken);
            observer.complete();
          } else {
            observer.error('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'email,public_profile' });
      }))
    );
  }

  getUserProfile(): Observable<any> {
      console.log(JSON.stringify((window as any).FB, null, 2));
    return this.loadSDK().pipe(
      switchMap(() => new Observable<any>((observer) => {
        (window as any).FB.api('/me', { fields: 'id,name,email,photo' }, (response: any) => {
          if (!response || response.error) {
            observer.error(response.error);
          } else {
            observer.next(response);
            observer.complete();
          }
        });
      }))
    );
  }

}
