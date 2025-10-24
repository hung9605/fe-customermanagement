import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundModule } from './notfound/notfound.module';
import { InventoryModule } from './inventory/inventory.module';
import { OgranizationModule } from './ogranization/ogranization.module';
import { Oauth2Module } from './oauth2/oauth2.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.intercepter';
import { ConfigModule } from './config/config.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserModule } from './user/user.module';
import { ShareModule } from './share/share.module';
import { ChatModule } from './chat/chat.module';
import { SupportModule } from './support/support.module';



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    HeaderModule,
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
    BrowserModule,
    BrowserAnimationsModule,
    NotfoundModule,
    InventoryModule,
    OgranizationModule,
    Oauth2Module,
    ConfigModule,
    DashboardModule,
    MultiSelectModule,
    UserModule,
    ShareModule,
    ChatModule,
    SupportModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})
  ],
  bootstrap:[AppComponent],
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class AppmoduleModule { }