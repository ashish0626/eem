import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard.guard';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultComponent } from './default/default.component';
import { EmployeedataComponent } from './employeedata/employeedata.component';

import { LoginComponent } from './login/login.component';
import {AppLoginComponent} from './app-login/app-login.component'
import { TableBasicComponent } from './table-basic/table-basic.component';
import { EmpdashboardComponent } from './empdashboard/empdashboard.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component:AppLoginComponent
  // },
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
  path: '',
  component: DefaultComponent,
  children: [{
    path: 'dash',
    component: DashboardComponent,
    //canActivate: [AuthGuard]
  },{
    path:'employee',
    component: EmployeedataComponent,
    //canActivate: [AuthGuard]
  },
  {
    path:'data',
    component: DataTableComponent,
    canActivate: [AuthGuard]
  } ,
  {
    path: 'importexcel',
    component:TableBasicComponent
  },
  {
    path: 'empdashboard',
    component:EmpdashboardComponent
  },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
