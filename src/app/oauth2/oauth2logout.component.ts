import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-oauth2-callback',
  template: '<p>Logout</p>'
})
export default class Oauth2LogoutComponent implements OnInit{

  constructor(private http: HttpClient){

  }

    ngOnInit(): void {
     const idToken = localStorage.getItem('id_token');
      if (!idToken) {
        console.error('Không tìm thấy id_token');
        return;
      }
      localStorage.clear();
      window.location.href = `http://localhost:9005/oauth2/logout-rp?id_token_hint=${idToken}
                                &post_logout_redirect_uri=http://localhost:4200`;
    }
}