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
  posts !: any;
  comments !: any;
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
        console.log('datadatadatadata', data);
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

  postComment(){

    console.log('this.page', this.page);

    this.fbService.commentOnPost(this.page.pageAccessToken,"856804464188108_122099591775145663","hello").subscribe({
       next: res => console.log('Comment successfully ', res)
      ,error: err => console.log(err)
    })
  }

  listPost(){
    this.fbService.getPagePosts(this.page.pageId,this.page.pageAccessToken).subscribe({
      next: data => {this.posts = data; console.log('this.post', this.posts);
      }
      ,error: err => console.log(err) 
    })
  }

  getComment(){
    this.fbService.getPostComments("856804464188108_122099591775145663", this.page.pageAccessToken).subscribe({
      next: data => {this.comments = data; console.log('this.comments', this.comments);
      }
      ,error: err => console.log(err)
      
    })
  }

}

export default interface Page{
  pageId: string;
  pageAccessToken: string
}