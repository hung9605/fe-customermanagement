import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AdminstratorModule } from './administrator/adminstrator.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { CustomerModule } from './customer/customer.module';
import { HeaderModule } from './header/header.module';
import { HistorycustomerModule } from './historycustomer/historycustomer.module';
import { Medicalexamv1Module } from './medicalexamv1/medicalexamv1.module';
import { MenuModule } from './menu/menu.module';
import { MoneyModule } from './money/money.module';
import { RegisterModule } from './register/register.module';
import { SchedulemedicalModule } from './schedulemedical/schedulemedical.module';
import { TestModule } from './test/test.module';
import { ListsuppliesModule } from './listsupplies/listsupplies.module';
import { FooterModule } from './footer/footer.module';
import { TimeModule } from './time/time.module';
import { CreateuserModule } from './createuser/createuser.module';
import { AdmenuModule } from './admenu/admenu.module';
import { RegisterhistoryModule } from './registerhistory/registerhistory.module';


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
    HistorycustomerModule,
    CustomerModule,
    MoneyModule,
    TestModule,
    AdminstratorModule,
    Medicalexamv1Module,
    ListsuppliesModule,
    FooterModule,
    TimeModule,
    CreateuserModule,
    AdmenuModule,
    RegisterhistoryModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})
  ],
  bootstrap:[AppComponent]
})
export class AppmoduleModule { }
