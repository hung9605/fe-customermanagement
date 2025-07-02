import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';

import { OrganizationChartModule } from 'primeng/organizationchart';


@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    OrganizationChartModule
  ]
})
export class TestModule { }
