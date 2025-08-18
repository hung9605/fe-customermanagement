import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { jwtDecode } from 'jwt-decode';
import AuthService from "../auth.service";
import { finalize } from "rxjs";
import { ApiConstants } from "../common/constants/ApiConstant";


@Component({
  selector: 'app-oauth2-callback',
  template: '<p>Logging in successfully</p><p> Hello {{name}}</p>'
})
export default class Oauth2CallbackComponent implements OnInit{

    name = '';
    readonly urlOath = ApiConstants.URL_OAUTH;
    constructor(private http: HttpClient,
                private router: ActivatedRoute,
                private authService: AuthService,
                private route: Router
    ){
        
    }

    ngOnInit(): void {
        this.router.queryParams.subscribe(params => {
        const code = params['code'];
        console.log('code',code);
        
        if (code) {
           this.http.post(`${ApiConstants.URL_ROOT}/oauth2/exchange-token`, { code })
  .pipe(
    finalize(() => {
      // Luôn reset trạng thái khi request hoàn tất
      this.authService.setHandling401(false);
    })
  )
  .subscribe({
    next: (token) => {
      console.log('Access Token', token); 
      localStorage.setItem('access_token', (token as any).access_token);
      localStorage.setItem('refresh_token',(token as any).refresh_token)
      localStorage.setItem('id_token',(token as any).id_token)
      const decoded: any = jwtDecode((token as any).access_token);
      this.name = decoded.sub;
      localStorage.setItem('user_name', decoded.sub || decoded.name || 'User');
      this.route.navigate([localStorage.getItem("redirect_url")]);
    },
    error: (err) => {
      console.error('Login failed', err);
    }
  });
        
        }
        });
    }

}