import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrl: './oauth2.component.scss'
})
export class Oauth2Component implements OnInit{
private clientId = 'client';
  private redirectUri = 'http://localhost:4200/oauth2/callback';
  private authServer = 'http://localhost:9005/oauth2/authorize';

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
