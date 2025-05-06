import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulemedicalComponent } from './schedulemedical.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [SchedulemedicalComponent],
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    FieldsetModule,
    AvatarModule,
    TableModule,
    RadioButtonModule
  ],
  exports:[SchedulemedicalComponent],
  providers:[DialogService,MessageService]
})
export class SchedulemedicalModule { }
