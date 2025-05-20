import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateuserComponent } from './createuser.component';
import { MenubarModule} from 'primeng/menubar';
import { HttpClientModule} from '@angular/common/http';
import { PanelModule} from 'primeng/panel';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {RouterModule} from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ConfirmationService, MessageService, SharedModule} from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FileUploadModule} from 'primeng/fileupload';
import {AvatarModule } from 'primeng/avatar';
import {ImageModule} from 'primeng/image';
import {InputIconModule} from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { GalleriaModule } from 'primeng/galleria';
import { SharedmoduleModule } from '../common/utils/sharedmodule/sharedmodule.module';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    CreateuserComponent
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
    ProgressSpinnerModule,
    FileUploadModule,
    AvatarModule,
    SharedModule,
    ImageModule,
    InputIconModule,
    IconFieldModule,
    GalleriaModule,
    SharedmoduleModule,
    EditorModule,
    FieldsetModule,
    ConfirmDialogModule,
    RadioButtonModule
  ],
  exports: [CreateuserComponent],
  providers: [MessageService]
})
export class CreateuserModule { }
