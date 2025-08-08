import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiConstants } from '../common/constants/ApiConstant';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrl: './oauth2.component.scss'
})
export class Oauth2Component implements OnInit{
  private clientId = 'client';
  private redirectUri = environment.redirectUri;
  private authServer = `${ApiConstants.URL_OAUTH}/oauth2/authorize`;

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.login();
  }

  login() {
    const authUrl = `${this.authServer}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=openid profile`;
    window.location.href = authUrl;
  }
}
