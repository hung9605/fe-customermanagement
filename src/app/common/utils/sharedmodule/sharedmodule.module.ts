import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VndFormatterDirective } from '../VndFormatterDirective';
import { AppendDegreeCDirectiveDirective } from '../append-degree-cdirective.directive';
import { OnlyNumberDirective } from '../only-number.directive';



@NgModule({
  declarations: [VndFormatterDirective,AppendDegreeCDirectiveDirective,OnlyNumberDirective],
  imports: [
    CommonModule
  ],
  exports:[VndFormatterDirective,AppendDegreeCDirectiveDirective,OnlyNumberDirective]
})
export class SharedmoduleModule { }
