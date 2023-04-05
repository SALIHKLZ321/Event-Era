import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRegisterService } from '../services/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class VendorGuard implements CanActivateChild {
  constructor(private _authService: LoginRegisterService, private _router: Router){}
  canActivateChild() {
    if(this._authService.authGuard() == false){
      this._router.navigate(['/vendor/login'])
      return false
    }else{
      return true
    }
  }
  
}
