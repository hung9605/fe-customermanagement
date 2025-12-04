import { Component, OnDestroy, OnInit } from '@angular/core';
import { FbService } from './fb.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fb',
  templateUrl: './fb.component.html',
  styleUrl: './fb.component.scss'
})
export class FbComponent implements OnInit, OnDestroy{
  username = '';
  page!: any;
  posts !: any;
  comments !: any;
  pages !: any;
  commentValue !: any;
  messagePost !: any;
  constructor(private fbService: FbService
            ,private sanitizer: DomSanitizer
  ){

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
          error: err => {console.error('Profile error:', err);alert(err);}
        });
  }

  getPageAccessToken(){
    this.fbService.getPageAccessToken().subscribe({
      next: (data) => {
        
        this.page = data[0];
        console.log('datadatadatadata', data);
        this.pages = data;
      },
      error: err => console.log(err)
    })
  }

  postMessage() {  
    this.fbService.postToPage(this.messagePost, this.page.access_token, this.page.id).subscribe({
      next : res => {console.log('Post thành công:', res);this.messagePost = '';this.listPost(this.page)},
      error: err => console.error('Lỗi post:', err)
    });
  }

  ngOnDestroy(): void {
    
  }

  postComment(post: any){
    this.fbService.commentOnPost(this.page.access_token,post.id,post.commentValue).subscribe({
       next: res => {console.log('Comment successfully ', res);this.getComment(post,this.page);post.commentValue = ''}
      ,error: err => console.log(err)
    });
  }

  listPost(page: any){
    this.fbService.getPagePosts(page.id,page.access_token).subscribe({
      next: data => {this.posts = data; console.log('this.post', this.posts);
      }
      ,error: err => console.log(err) 
    })
  }

  getComment(post: any,page: any){
    this.fbService.getPostComments(post.id, page.access_token).subscribe({
      next: data => {post.comments = data;
        console.log('this.comments', data);
      }
      ,error: err => console.log(err)
    })
  }

  getUrlThumnail(id: any){
    const url = `https://graph.facebook.com/${id}/picture?type=square&width=50&height=50`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}