import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './components/vendor/vendor.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { VendorRequestComponent } from './components/vendor-request/vendor-request.component';
import { AuthGuard } from './routeGuard/auth.guard';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {
    path:'',
    component:AdminComponent,
    canActivateChild: [AuthGuard],
    children:[
      {path:'', component:DashboardComponent },
      {path:'vendor-request',component:VendorRequestComponent},
      {path:'vendors',component:VendorComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminRoutingModule { }
