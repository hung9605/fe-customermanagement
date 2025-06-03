import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VndFormatterDirective } from '../VndFormatterDirective';
import { AppendDegreeCDirectiveDirective } from '../append-degree-cdirective.directive';



@NgModule({
  declarations: [VndFormatterDirective,AppendDegreeCDirectiveDirective],
  imports: [
    CommonModule
  ],
  exports:[VndFormatterDirective,AppendDegreeCDirectiveDirective]
})
export class SharedmoduleModule { }
