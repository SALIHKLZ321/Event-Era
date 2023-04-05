import { CheckoutComponent } from './components/checkout/checkout.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './user.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ChatComponent } from './components/chat/chat.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';
import { EventsComponent } from './components/events/events.component';
const routes: Routes = [
  {path:'',component:UserComponent,
  children:[
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:RegisterComponent},
  {path:'profile',canActivate: [AuthGuard],component: ProfileComponent},
  {path:'chat',canActivate: [AuthGuard],component: ChatComponent},
  {path:'events',component: EventsComponent},
  {path:'chat/:id',canActivate: [AuthGuard],component: ChatComponent},
  {path:'vendors',component: VendorsComponent},
  {path:'vendor-details/:id',canActivate: [AuthGuard],component: VendorDetailsComponent},
  {path:'event-details/:id',canActivate: [AuthGuard],component: EventDetailComponent},
  {path:'checkout/:id',canActivate: [AuthGuard],component: CheckoutComponent},
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class UserRoutingModule { }
