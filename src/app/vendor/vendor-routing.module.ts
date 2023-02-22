import { VendorComponent } from './vendor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path:'',
    component:VendorComponent,
    children:[
     {path:'',component:HomeComponent},
     {path:'login',component:LoginComponent},
     {path:'sign-up',component:RegisterComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
