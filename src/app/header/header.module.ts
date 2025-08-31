import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToolbarModule} from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PanelModule } from 'primeng/panel';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    SplitButtonModule,
    ToolbarModule,
    AvatarModule,
    DynamicDialogModule,
    CarouselModule
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
