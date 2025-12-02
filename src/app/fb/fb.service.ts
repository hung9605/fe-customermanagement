import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import Page from './fb.component';

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
    return this.loadSDK().pipe( 
      switchMap(() => new Observable<string>((observer) => {
        // (window as any).FB.login((response: any) => {
        //   if (response.authResponse) {
        //     observer.next(response.authResponse.accessToken);
        //     observer.complete();
        //   } else {
        //     observer.error('User cancelled login or did not fully authorize.');
        //   }
        // }, { scope: 'email,public_profile' });

  (window as any).FB.getLoginStatus((statusResponse: any) => {
        if (statusResponse.status === 'connected') {
          observer.next(statusResponse.authResponse.accessToken);
          observer.complete();
        } else {
          // Nếu chưa login, mở popup login
          (window as any).FB.login((loginResponse: any) => {
            if (loginResponse.authResponse) {
              observer.next(loginResponse.authResponse.accessToken);
              observer.complete();
            } else {
              observer.error('User cancelled login or did not fully authorize.');
            }
          }, {
             scope: 'email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts,pages_manage_engagement,pages_manage_metadata'
          });
        }
      });

      }))
    );
  }

  getUserProfile(): Observable<any> {
    return this.loadSDK().pipe(
      switchMap(() => new Observable<any>((observer) => {
        // (window as any).FB.api('/me', { fields: 'id,name,email' }, (response: any) => {
        //   if (!response || response.error) {
        //     observer.error(response.error);
        //   } else {
        //     observer.next(response);
        //     observer.complete();
        //   }
        // });


      (window as any).FB.getLoginStatus((statusResponse: any) => {
        if (statusResponse.status === 'connected') {
          (window as any).FB.api('/me', { fields: 'id,name,email' }, (response: any) => {
            if (!response || response.error) {
              observer.error(response.error);
            } else {
              observer.next(response);
              observer.complete();
            }
          });
        } else {
          observer.error('User not logged in');
        }
      });

      }))
    );
  }


  postToPage(message: string, pageAccessToken: string, pageId: string): Observable<any> {
  return this.loadSDK().pipe(
    switchMap(() => new Observable<any>((observer) => {
      (window as any).FB.api(
        `/${pageId}/feed`,
        'POST',
        { message, access_token: pageAccessToken },
        (response: any) => {
          if (!response || response.error) {
            observer.error(response.error);
          } else {
            observer.next(response);
            observer.complete();
          }
        }
      );
    }))
  );
}

getPageAccessToken(pageId?: string): Observable<Page[]> {
  return this.loadSDK().pipe(
    switchMap(() => new Observable<any>((observer) => {
      (window as any).FB.getLoginStatus((statusResponse: any) => {
        if (statusResponse.status === 'connected') {
          const userToken = statusResponse.authResponse.accessToken;

          // Lấy danh sách Page của user
          (window as any).FB.api('/me/accounts', { access_token: userToken }, (res: any) => {
            if (!res || res.error) {
              observer.error(res.error);
            } else {
              let pages = res.data;
              console.log('pages',pages);
              
              // Nếu có truyền pageId, lọc ra
              if (pageId) {
                pages = pages.filter((p: any) => p.id === pageId);
              }

              // Trả về pageId + pageAccessToken
              const result = pages.map((p: any) => ({
                pageId: p.id,
                pageAccessToken: p.access_token
              }));
              console.log('result',result);
              

              observer.next(result);
              observer.complete();
            }
          });
        } else {
          observer.error('User not logged in');
        }
      });
    }))
  );
}


 /** Comment lên post của Page */
  commentOnPost(pageAccessToken: string, postId: string, message: string): Observable<any> {
    return new Observable((observer) => {
        (window as any).FB.api(
        `/${postId}/comments`,
        'POST',
        {
          message,
          access_token: pageAccessToken
        },
        (response: any) => {
          if (response && !response.error) {
            observer.next(response);
            observer.complete();
            console.log('response0',response);
            
          } else {
            observer.error(response.error);
          }
        }
      );
    });
  };


   getPagePosts(pageId: string, pageAccessToken: string): Observable<any[]> {
    return new Observable((observer) => {
      (window as any).FB.api(
        `/${pageId}/posts`,
        'GET',
        { fields: 'id,message,created_time,permalink_url', access_token: pageAccessToken },
        (response: any) => {
          if (response && !response.error) {
            // Gửi dữ liệu về observer
            observer.next(response.data);
            observer.complete();
          } else {
            observer.error(response.error);
          }
        }
      );
    });
  }

getPostComments(postId: string, pageAccessToken: string): Observable<any[]> {
  return new Observable((observer) => {
    (window as any).FB.api(
      `/${postId}/comments`,
      'GET',
      { access_token: pageAccessToken, limit: 100 },
      (res: any) => {
        if (res && !res.error) {
          observer.next(res.data || []);
          observer.complete();
        } else {
          observer.error(res.error);
        }
      }
    );
  });
}


}