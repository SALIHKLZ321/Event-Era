import { CommonServiceService } from '../common-service.service';
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

  constructor(private authService:LoginRegisterService, private _common:CommonServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<any>>{
    const authDetail = this._common.getAuthDetails();
    const authReq = request.clone({
      headers: request.headers.set('Authorization',"Bearer " + authDetail?.token)
    });
    
    if(authDetail == null){
      return next.handle(request);
    }
    return next.handle(authReq);
  }
}
