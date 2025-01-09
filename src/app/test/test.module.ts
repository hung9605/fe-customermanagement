import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
    ReactiveFormsModule
  ]
})
export class TestModule { }
