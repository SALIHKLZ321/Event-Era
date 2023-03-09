import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { UserComponent } from './user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from '../common/interceptor/auth.interceptor';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    UserComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, UserRoutingModule],
})
export class UserModule {}
