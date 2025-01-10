import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalexamComponent } from './medicalexam.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { SharedmoduleModule } from '../common/utils/sharedmodule/sharedmodule.module';
import { Medicalexamv1Component } from './medicalexamv1.component';


@NgModule({
  declarations: [Medicalexamv1Component],
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    ToastModule,
    SharedmoduleModule
  ],
  exports:[Medicalexamv1Component],
  providers:[DialogService]
})
export class Medicalexamv1Module { }
