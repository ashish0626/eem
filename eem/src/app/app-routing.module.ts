import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultComponent } from './default/default.component';

import { LoginComponent } from './login/login.component';


// const routes: Routes = [
//   {path:'',component:LoginComponent},
//   {path:'default',component:DefaultComponent},
  
//   {path:'dash',component:DashboardComponent},
//   {path:'login',component:LoginComponent},

// ];
const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: 'dash',
    component: DashboardComponent
  },
  ]
},
{
  path: 'login',
  component:LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
