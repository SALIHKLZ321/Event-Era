import { LoginRegisterService } from 'src/app/user/services/login-register.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:LoginRegisterService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler){
    const authToken = this.authService.getToken();
    const authReq = request.clone({
      headers: request.headers.set('authorization',"Bearer " + authToken)
    })
    return next.handle(request);
  }
}
