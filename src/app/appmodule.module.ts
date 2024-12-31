import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { HeaderModule } from './header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './register/register.module';
import { MenuModule } from './menu/menu.module';
import { SchedulemedicalModule } from './schedulemedical/schedulemedical.module';
import { MedicalexamModule } from './medicalexam/medicalexam.module';
import { HistorycustomerModule } from './historycustomer/historycustomer.module';
import { CustomerModule } from './customer/customer.module';
import { MoneyModule } from './money/money.module';
import { VndFormatterDirective } from './common/utils/VndFormatterDirective';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterLink,
    RouterOutlet,
    HeaderModule,
    BrowserAnimationsModule,
    RegisterModule,
    MenuModule,
    SchedulemedicalModule,
    MedicalexamModule,
    HistorycustomerModule,
    CustomerModule,
    MoneyModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})
  ],
  bootstrap:[AppComponent]
})
export class AppmoduleModule { }
