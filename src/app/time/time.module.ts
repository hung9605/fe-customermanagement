import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { TimeComponent } from './time.component';
import { MessageService } from 'primeng/api';
import { TimeService } from './time.service';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [TimeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DialogModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    PanelModule,
    AvatarModule,
    CalendarModule
  ],
  exports:[TimeComponent],
  providers:[MessageService,TimeService]
})
export class TimeModule { }
