import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { PanelModule } from 'primeng/panel';
import { DialogService } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule
    ,PanelModule
  ],
  exports:[]
  ,
  providers: [DialogService]
})
export class ConfigModule { }
