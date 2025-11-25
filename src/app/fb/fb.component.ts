import { Component, OnDestroy, OnInit } from '@angular/core';
import { FbService } from './fb.service';

@Component({
  selector: 'app-fb',
  templateUrl: './fb.component.html',
  styleUrl: './fb.component.scss'
})
export class FbComponent implements OnInit, OnDestroy{

  constructor(private fbService: FbService){

  }

  ngOnInit(): void {
   
  }

  login(){
 this.fbService.login().subscribe({
      next: token => {
        console.log('Access token:', token);

        // Lấy thông tin user
        this.fbService.getUserProfile().subscribe({
          next: profile => console.log('User profile:', profile),
          error: err => console.error('Profile error:', err)
        });
      },
      error: err => console.error('Login error:', err)
    });
  }

  ngOnDestroy(): void {
    
  }

}
