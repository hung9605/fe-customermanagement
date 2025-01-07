import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    InputTextModule, // Include InputText module
    ButtonModule,    // Include Button module for Add button
    FormsModule,
  ]
})
export class TestModule { }
