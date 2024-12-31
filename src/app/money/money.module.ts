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
import { MoneyComponent } from './money.component';
import { MoneyformComponent } from './moneyform/moneyform.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { VndFormatterDirective } from '../common/utils/VndFormatterDirective';
import { MedicalexamModule } from '../medicalexam/medicalexam.module';
import { SharedmoduleModule } from '../common/utils/sharedmodule/sharedmodule.module';

@NgModule({
  declarations: [MoneyComponent, MoneyformComponent],
  imports: [
    CommonModule,
    MenubarModule,
    HttpClientModule,
    PaginatorModule,
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
    SharedmoduleModule,
    MedicalexamModule
  ],
  exports:[MoneyComponent,MoneyformComponent],
  providers:[MessageService,DialogService]
})
export class MoneyModule { }
