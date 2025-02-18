import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { PanelModule } from 'primeng/panel';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    PanelModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
