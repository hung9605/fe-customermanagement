import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [SupportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ListboxModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    ButtonModule,
    FormsModule,
    ToastModule
  ],
  exports:[],
  providers:[MessageService]
})
export class SupportModule { }
