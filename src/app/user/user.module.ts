import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { UserComponent } from './user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UserComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, UserRoutingModule],
})
export class UserModule {}
