import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultComponent } from './default/default.component';
import { EmployeedataComponent } from './employeedata/employeedata.component';

import { LoginComponent } from './login/login.component';


const routes: Routes = [
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
    component: DashboardComponent
  },{
    path:'employee',
    component: EmployeedataComponent
  },
  {
    path:'data',
    component: DataTableComponent
  } 
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
