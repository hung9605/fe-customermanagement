import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OgranizationComponent } from './ogranization.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OgranizationService } from './ogranization.service';
import { FormComponent } from './form/form.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OgranizationComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    OrganizationChartModule,
    ButtonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule
  ],
  providers:[OgranizationService]
})
export class OgranizationModule { }