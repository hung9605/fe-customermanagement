import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmenuComponent } from './admenu.component';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule} from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginatorModule} from 'primeng/paginator';
import { CalendarModule} from 'primeng/calendar';
import { ToastModule} from 'primeng/toast';
import { TooltipModule} from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageService} from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';


@NgModule({
  declarations: [
    AdmenuComponent
  ],
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
        DialogModule,
        CalendarModule,
        ToggleButtonModule,
        ProgressSpinnerModule,
        IconFieldModule,
        InputIconModule,
        FieldsetModule,
        AvatarModule
  ],
  exports: [AdmenuComponent],
  providers: [MessageService]
})
export class AdmenuModule {}