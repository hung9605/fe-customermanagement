import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VndFormatterDirective } from '../VndFormatterDirective';



@NgModule({
  declarations: [VndFormatterDirective],
  imports: [
    CommonModule
  ],
  exports:[VndFormatterDirective]
})
export class SharedmoduleModule { }
