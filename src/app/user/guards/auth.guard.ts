import { CommonServiceService } from './../../common/common-service.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginRegisterService } from '../services/login-register.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:LoginRegisterService,private router: Router, private _common:CommonServiceService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const authdetails = this._common.getAuthDetails();
        if (!authdetails || authdetails.role != 'user') {
            this.router.navigate(['/login'])
        }
        return true;
    }
    
}