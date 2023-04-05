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
import { ChatComponent } from './components/chat/chat.component';
import { ChatBodyComponent } from './components/chat/chat-body/chat-body.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { WalletComponent } from './components/wallet/wallet.component'
import { NgxPayPalModule } from 'ngx-paypal';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { EventSearchPipe } from './pipes/event-search.pipe';
import { TicketComponent } from './components/profile/ticket/ticket.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    UserComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    ChatComponent,
    ChatBodyComponent,
    ChatListComponent,
    VendorsComponent,
    VendorDetailsComponent,
    EventsComponent,
    EventDetailComponent,
    CheckoutComponent,
    WalletComponent,
    CarouselComponent,
    EventSearchPipe,
    TicketComponent,
    FooterComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, UserRoutingModule, GooglePayButtonModule, NgxPayPalModule],
})
export class UserModule {}
