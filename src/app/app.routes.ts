import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuFormComponent } from './menu/menuform.component';
import { RegisterComponent } from './register/register.component';
import { FormregisterComponent } from './register/formregister/formregister.component';
import { HistorycustomerComponent } from './historycustomer/historycustomer.component';
import { CustomerComponent } from './customer/customer.component';
import { MoneyComponent } from './money/money.component';
import { TestComponent } from './test/test.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { ListsuppliesComponent } from './listsupplies/listsupplies.component';
import { FormsuppliesComponent } from './listsupplies/formsupplies/formsupplies.component';
import { TimeComponent } from './time/time.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { AdmenuComponent } from './admenu/admenu.component';
import { RegisterhistoryComponent } from './registerhistory/registerhistory.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OgranizationComponent } from './ogranization/ogranization.component';
import { Oauth2Component } from './oauth2/oauth2.component';
import Oauth2CallbackComponent from './oauth2/oauth2callback.component';
import { authGuard } from './authguard';
import Oauth2LogoutComponent from './oauth2/oauth2logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { SupportComponent } from './support/support.component';



export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '',component: DashboardComponent},
      { path: 'menu', component: MenuComponent },
      { path: 'menuform', component: MenuFormComponent },
      { path: 'register', component: FormregisterComponent },
      { path: 'listregister', component: RegisterComponent },
      { path: 'historycustomer', component: HistorycustomerComponent },
      { path: 'listcustomer', component: CustomerComponent },
      { path: 'money', component: MoneyComponent },
      { path: 'test', component: TestComponent },
      { path: 'db', component: AdministratorComponent },
      { path: 'listmedicalsupplies', component: ListsuppliesComponent },
      { path: 'addmedicalsupplies', component: FormsuppliesComponent },
      { path: 'createtime', component: TimeComponent },
      { path: 'createuser', component: CreateuserComponent },
      { path: 'admenu', component: AdmenuComponent },
      { path: 'listregisterhistory', component: RegisterhistoryComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'ogranization', component: OgranizationComponent },
      { path: 'user', component: UserComponent },
      { path: 'support', component: SupportComponent }
    ]
  },
  { path: 'oauth2', component: Oauth2Component },
  { path: 'oauth2/callback', component: Oauth2CallbackComponent },
  { path: 'logout', component: Oauth2LogoutComponent },
  { path: '404notfound', component: NotfoundComponent },
  { path: '**', component: NotfoundComponent }
];
