import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from "@angular/router";

@Injectable ()
export class AuthGuard implements CanActivateChild {
    constructor (private LoginService: LoginService, private router: Router) {}
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        const isAuth = this.LoginService.getIsAuth();
        if (!isAuth) {
          this.router.navigate(['/admin/login'])
        }
        return isAuth;
      }
    }
