import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from './material/material.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './common/interceptor/auth.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { ErrorPageComponent } from './common/error-page/error-page.component';
import { GooglePayButtonModule } from '@google-pay/button-angular'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NgChartsModule } from 'ng2-charts';
import { environment } from 'src/environments/environment';


const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    MatNativeDateModule,
    GooglePayButtonModule,
    NgChartsModule,
    SocketIoModule.forRoot(config)
],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
