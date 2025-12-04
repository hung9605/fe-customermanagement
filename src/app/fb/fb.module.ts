import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbComponent } from './fb.component';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';



@NgModule({
  declarations: [
    FbComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ImageModule
]
  ,exports: []
  ,providers: []
})
export class FbModule { }
