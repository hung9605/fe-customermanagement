import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InventoryService } from './inventory.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { GalleriaModule } from 'primeng/galleria';
import { ForminventoryComponent } from './forminventory/forminventory.component';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedmoduleModule } from '../common/utils/sharedmodule/sharedmodule.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    InventoryComponent,
    ForminventoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
    InputIconModule,
    IconFieldModule,
    GalleriaModule,
    AvatarModule,
    DropdownModule,
    ConfirmDialogModule,
    SharedmoduleModule,
    FormsModule
  ],
  providers:[MessageService,InventoryService]
})
export class InventoryModule { }
