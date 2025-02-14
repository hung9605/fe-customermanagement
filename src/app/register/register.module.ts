import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PaginatorModule} from 'primeng/paginator';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {RouterModule } from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {MessageService} from 'primeng/api';
import { FormregisterComponent } from './formregister/formregister.component';
import { RegisterComponent } from './register.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';
@NgModule({
  declarations: [RegisterComponent,FormregisterComponent],
  imports: [
    CommonModule,
    MenubarModule,
    HttpClientModule,
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    BrowserModule,
    BrowserAnimationsModule,
    PaginatorModule,
    RouterModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
    TooltipModule,
    DialogModule,
    TableModule,
    ToggleButtonModule,
    ProgressSpinnerModule,
    AvatarModule
  ],
  exports:[RegisterComponent,FormregisterComponent],
  providers:[MessageService]
})
export class RegisterModule { }
