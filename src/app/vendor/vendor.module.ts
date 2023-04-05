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
import { ChatComponent } from './components/chat/chat.component';
import { ChatBodyComponent } from './components/chat/chat-body/chat-body.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { ChartComponent } from './components/home/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
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
    ImageUploadComponent,
    ChatComponent,
    ChatBodyComponent,
    ChatListComponent,
    EventDetailsComponent,
    WalletComponent,
    EventEditComponent,
    DashboardComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    VendorRoutingModule,
    MaterialModule,
    NgChartsModule,
    
  ]
})
export class VendorModule { }
