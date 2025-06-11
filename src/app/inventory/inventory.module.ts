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
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InventoryService } from './inventory.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { GalleriaModule } from 'primeng/galleria';



@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
    InputIconModule,
    IconFieldModule,
    GalleriaModule,
  ],
  providers:[InventoryService]
})
export class InventoryModule { }
