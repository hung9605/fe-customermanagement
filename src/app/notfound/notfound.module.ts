import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RouterModule
  ]
})
export class NotfoundModule { }
