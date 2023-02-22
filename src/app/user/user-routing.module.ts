import { UserComponent } from './user.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:UserComponent,
  children:[
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:RegisterComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class UserRoutingModule { }
