import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {RouterModule } from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {MessageService} from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserComponent } from './user.component';
import {ChipModule} from 'primeng/chip';
import { ChartModule } from 'primeng/chart';
import { UserformComponent } from './userform/userform.component';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [UserComponent, UserformComponent],
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
    PaginatorModule,
    RouterModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
    TooltipModule,
    DialogModule,
    TableModule,
    ProgressSpinnerModule,
    ChipModule,
    ChartModule,
    CardModule,
    PasswordModule,
    AvatarModule,
    MultiSelectModule
  ],
  exports:[],
  providers:[MessageService]
})


export class UserModule { }
