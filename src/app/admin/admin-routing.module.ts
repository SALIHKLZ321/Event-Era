import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './components/vendor/vendor.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { VendorRequestComponent } from './components/vendor-request/vendor-request.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {path:'',component:DashboardComponent},
      {path:'login',component:LoginComponent},
      {path:'vendor-request',component:VendorRequestComponent},
      {path:'vendors',component:VendorComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
