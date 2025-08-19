import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { PanelModule } from 'primeng/panel';
import { DialogService } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
     CommonModule
    ,PanelModule
    ,InputSwitchModule
    ,FormsModule
    ,ButtonModule
    ,AvatarModule
    ,ReactiveFormsModule
    ,ProgressSpinnerModule
    ,BlockUIModule
    ,InputTextModule
  ],
  exports:[],
  providers: [DialogService, MessageService]
})
export class ConfigModule { }
