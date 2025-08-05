import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Oauth2Component } from './oauth2.component';
import { ButtonModule } from 'primeng/button';
import Oauth2CallbackComponent from './oauth2callback.component';



@NgModule({
  declarations: [
    Oauth2Component,
    Oauth2CallbackComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [],
  providers: []
})
export class Oauth2Module { }
