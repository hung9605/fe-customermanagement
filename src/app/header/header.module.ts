import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToolbarModule} from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    SplitButtonModule,
    ToolbarModule,
    AvatarModule
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
