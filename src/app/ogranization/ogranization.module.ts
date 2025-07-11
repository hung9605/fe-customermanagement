import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OgranizationComponent } from './ogranization.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OgranizationService } from './ogranization.service';
import { FormComponent } from './form/form.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    OgranizationComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    OrganizationChartModule,
    ButtonModule
  ],
  providers:[OgranizationService]
})
export class OgranizationModule { }