import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule} from 'primeng/table';
import { PaginatorModule} from 'primeng/paginator';
import { CalendarModule} from 'primeng/calendar';
import { ToastModule} from 'primeng/toast';
import { TooltipModule} from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService} from 'primeng/api';
import { CustomerComponent } from './customer.component';
import { FormCustomerComponent } from './formcustomer/formcustomer.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import { CustomermedicalhistoryComponent } from './customermedicalhistory/customermedicalhistory.component';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [CustomerComponent,FormCustomerComponent, CustomermedicalhistoryComponent],
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
    DialogModule,
    CalendarModule,
    ToggleButtonModule,
    ProgressSpinnerModule,
    IconFieldModule,
    InputIconModule,
    FieldsetModule,
    AvatarModule,
    ConfirmDialogModule
  ],
  exports: [CustomerComponent,FormCustomerComponent],
  providers: [MessageService,ConfirmationService]
})

export class CustomerModule { }