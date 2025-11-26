import { Component, OnDestroy, OnInit } from '@angular/core';
import { FbService } from './fb.service';
import { Page } from '../common/constants/CommonConstant';

@Component({
  selector: 'app-fb',
  templateUrl: './fb.component.html',
  styleUrl: './fb.component.scss'
})
export class FbComponent implements OnInit, OnDestroy{
  username = '';
  page!: Page;

  constructor(private fbService: FbService){

  }

  ngOnInit(): void {
   
  }

  login(){
 this.fbService.login().subscribe({
      next: token => {
        console.log('Access token:', token);
        this.fbService.getUserProfile().subscribe({
          next: profile => console.log('User profile:', profile),
          error: err => console.error('Profile error:', err)
        });
      },
      error: err => console.error('Login error:', err)
    });
  }

  getProfile(){
        this.fbService.getUserProfile().subscribe({
          next: profile => {console.log('User profile:', profile);
            this.username = profile.name
          },
          error: err => console.error('Profile error:', err)
        });
  }

  getPageAccessToken(){
    this.fbService.getPageAccessToken().subscribe({
      next: (data) => {
        this.page = data[0];
      },
      error: err => console.log(err)
    })
  }

  postMessage() {
  const message = 'Hello từ Angular!';
  
  this.fbService.postToPage(message, this.page.pageAccessToken, this.page.pageId).subscribe({
    next : res => console.log('Post thành công:', res),
    error: err => console.error('Lỗi post:', err)
  });
}

  ngOnDestroy(): void {
    
  }

}

export default interface Page{
  pageId: string;
  pageAccessToken: string
}