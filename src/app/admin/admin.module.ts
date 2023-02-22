import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { VendorRequestComponent } from './components/vendor-request/vendor-request.component';
import { VendorComponent } from './components/vendor/vendor.component';



@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    VendorRequestComponent,
    VendorComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
