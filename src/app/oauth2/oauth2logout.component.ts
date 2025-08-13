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
    const params = new HttpParams().set('id_token_hint', idToken).set('post_logout_redirect_uri','http://localhost:4200');
        localStorage.clear();
        this.http.get('http://localhost:9005/oauth2/logout-rp', {
  params,
  observe: 'response'  // để lấy toàn bộ HttpResponse, bao gồm headers
}).subscribe({
  next: (resp) => {
    console.log(resp);
    // kiểm tra header Location
    const redirectUrl = resp.headers.get('Location');
    if (redirectUrl) {
      window.location.href = redirectUrl; // redirect FE
    }
  },
  error: (err) => console.error('Logout failed', err)
});


    }
}