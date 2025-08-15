import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { PanelModule } from 'primeng/panel';



@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    PanelModule
  ]
})
export class ConfigModule { }
