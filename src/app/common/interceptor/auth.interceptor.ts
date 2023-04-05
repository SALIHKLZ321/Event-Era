import { CommonServiceService } from '../common-service.service';
import { LoginRegisterService } from 'src/app/user/services/login-register.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import {catchError} from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:LoginRegisterService, private _common:CommonServiceService, private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<any>>{
    const authDetail = this._common.getAuthDetails();
    const authReq = request.clone({
      headers: request.headers.set('Authorization',"Bearer " + authDetail?.token)
    });
    
    if(authDetail == null){
      return next.handle(request)
      
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
         let errorMsg = '';
         if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
         } else {
            console.log('This is server side error');
            this._common.logout();
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
         }
         console.log(errorMsg);
         return throwError(errorMsg);
      })
)
  }
}
