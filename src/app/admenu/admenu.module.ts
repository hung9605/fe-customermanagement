import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmenuComponent } from './admenu.component';
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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import {TreeTableModule} from 'primeng/treetable';
import { AdmenuformComponent } from './admenuform/admenuform.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AdmenuComponent,
    AdmenuformComponent
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
        TreeTableModule,
        ConfirmDialogModule
  ],
  exports: [AdmenuComponent,AdmenuformComponent],
  providers: [MessageService, ConfirmationService]
})
export class AdmenuModule {}