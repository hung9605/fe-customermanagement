import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuFormComponent } from './menu/menuform.component';
import { RegisterComponent } from './register/register.component';
import { FormregisterComponent } from './register/formregister/formregister.component';
import { HistorycustomerComponent } from './historycustomer/historycustomer.component';
import { CustomerComponent } from './customer/customer.component';
import { MoneyComponent } from './money/money.component';

export const routes: Routes = [
    {path:'menu', component:MenuComponent,children:[]},
    {path:'menuform', component:MenuFormComponent,children:[]},
    {path:'register', component:FormregisterComponent,children:[]},
    {path:'listregister', component:RegisterComponent,children:[]},
    {path:'historycustomer', component:HistorycustomerComponent,children:[]},
    {path:'listcustomer', component:CustomerComponent,children:[]},
    {path:'money', component:MoneyComponent,children:[]},
];
