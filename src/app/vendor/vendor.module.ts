import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventHostComponent } from './components/event-host/event-host.component';
import { EventComponent } from './components/event/event.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImageUploadComponent } from './components/modal/image-upload/image-upload.component';


@NgModule({
  declarations: [
    VendorComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EventHostComponent,
    EventComponent,
    ProfileComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VendorRoutingModule,
    MaterialModule
  ]
})
export class VendorModule { }
