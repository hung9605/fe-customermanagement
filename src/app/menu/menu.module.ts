import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuFormComponent } from './menuform.component';
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
@NgModule({
  declarations: [
    MenuComponent,
    MenuFormComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    HttpClientModule,
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
    DialogModule
  ],
  exports:[
    MenuComponent,
    MenuFormComponent
  ],
  providers:[
    MessageService
  ]
})
export class MenuModule { }
