import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';
import { ValidadminComponent } from './validadmin/validadmin.component';
import { AdministratorComponent } from './administrator.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [ ValidadminComponent,AdministratorComponent],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DialogModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  exports:[AdministratorComponent,ValidadminComponent],
  providers:[]
})
export class AdminstratorModule { }
