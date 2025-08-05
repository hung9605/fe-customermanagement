import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import JwtDecode from "jwt-decode";
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-oauth2-callback',
  template: '<p>Logging in successfully</p><p> Hello {{name}}</p>'
})
export default class Oauth2CallbackComponent implements OnInit{

    name = '';
    constructor(private http: HttpClient,
                private router: ActivatedRoute
    ){
        
    }

    ngOnInit(): void {
        this.router.queryParams.subscribe(params => {
        const code = params['code'];
        console.log('code',code);
        
        if (code) {
            this.http.post('http://localhost:9006/oauth2/exchange-token', { code })
            .subscribe(token => {
                console.log('Access Token', token); 
                localStorage.setItem('access_token', (token as any).access_token);
                 // Giải mã token để lấy thông tin user
            const decoded: any = jwtDecode((token as any).access_token);
            console.log('Decoded token:', decoded);
            this.name = decoded.sub;
            console.log('this.name', this.name);
            
            // Lưu thông tin user vào localStorage
            localStorage.setItem('user_name', decoded.sub || decoded.name || 'User');
            });
        }
        });
    }

}