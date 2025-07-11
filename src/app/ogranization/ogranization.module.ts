import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OgranizationComponent } from './ogranization.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OgranizationService } from './ogranization.service';

@NgModule({
  declarations: [
    OgranizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationChartModule
  ],
  providers:[OgranizationService]
})
export class OgranizationModule { }