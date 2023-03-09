import { EventHostComponent } from './components/event-host/event-host.component';
import { VendorComponent } from './vendor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventComponent } from './components/event/event.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: RegisterComponent},
  {
    path:'',
    component: VendorComponent,
    children: [
     {path:'',component: HomeComponent},
     {path:'event-upload',component: EventHostComponent},
     {path:'events',component: EventComponent},
     {path:'profile',component: ProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
