import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MenubarModule} from 'primeng/menubar';
import { HttpClientModule} from '@angular/common/http';
import { PanelModule} from 'primeng/panel';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PaginatorModule} from 'primeng/paginator';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {RouterModule} from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {MessageService, SharedModule} from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ListsuppliesComponent } from './listsupplies.component';
import {SupppliesService } from './suppplies.service';
import {FormsuppliesComponent } from './formsupplies/formsupplies.component';
import {FileUploadModule} from 'primeng/fileupload';
import {AvatarModule } from 'primeng/avatar';
import {ImageModule} from 'primeng/image';
import {InputIconModule} from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
@NgModule({
  declarations: [ListsuppliesComponent,FormsuppliesComponent],
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
    ProgressSpinnerModule,
    FileUploadModule,
    AvatarModule,
    SharedModule,
    ImageModule,
    InputIconModule,
    IconFieldModule
  ],
  exports:[ListsuppliesComponent,FormsuppliesComponent],
  providers:[MessageService,SupppliesService]
})
export class ListsuppliesModule { }