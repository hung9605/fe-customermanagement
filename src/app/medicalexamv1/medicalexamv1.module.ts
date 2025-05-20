import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { SharedmoduleModule } from '../common/utils/sharedmodule/sharedmodule.module';
import { Medicalexamv1Component } from './medicalexamv1.component';
import { FieldsetModule } from 'primeng/fieldset';
import {AvatarModule} from 'primeng/avatar'
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
  declarations: [Medicalexamv1Component],
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ToastModule,
    SharedmoduleModule,
    FieldsetModule,
    AvatarModule,
    TooltipModule,
    DropdownModule,
    RadioButtonModule
  ],
  exports:[Medicalexamv1Component],
  providers:[DialogService]
})
export class Medicalexamv1Module { }
