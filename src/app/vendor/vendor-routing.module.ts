import { VendorGuard } from './guards/vendor.guard';
import { EventHostComponent } from './components/event-host/event-host.component';
import { VendorComponent } from './vendor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventComponent } from './components/event/event.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { ChartComponent } from './components/home/chart/chart.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: RegisterComponent},
  {
    path:'',
    canActivateChild: [VendorGuard],
    component: VendorComponent,
    children: [
      {path: 'chart',component: ChartComponent},
     {path:'',component: HomeComponent},
     {path:'chat',component: ChatComponent},
     {path:'chat/:id',component: ChatComponent},
     {path:'event-upload',component: EventHostComponent},
     {path:'events',component: EventComponent},
     {path:'profile',component: ProfileComponent},
     {path: 'event-detail/:id', component:EventDetailsComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [VendorGuard]
})
export class VendorRoutingModule { }
