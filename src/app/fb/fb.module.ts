import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbComponent } from './fb.component';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    FbComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule
]
  ,exports: []
  ,providers: []
})
export class FbModule { }
