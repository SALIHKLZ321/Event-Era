import { registrationForm } from '../models/register.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import Swal from 'sweetalert2';
import { loginForm } from '../models/login.model.js'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  private token:string | undefined | null;
  vendorAuth = false;
  private tokenTimer:any;
  vendorAuthStatusListener =new Subject<boolean>()
  constructor(private http:HttpClient ,private router:Router) { }
  registerVendor(form:registrationForm){
    this.http.post<{sign_up_vendor:boolean}>(`${environment.apiUrl}/vendor/sign-up`, form).subscribe(res => {
      if(res.sign_up_vendor == true){
        this.router.navigate(['/login'])
      }else{
        Swal.fire('This email or phone already registered')
      }
    })
  }
  loginVendor(form:loginForm){
    this.http.post<{status:boolean, message:string, token:string, expiresIn:number}>(`${environment.apiUrl}/vendor/login`, form)
    .subscribe((res) => {
      const token = res.token;
      this.token = token;
      if(token){
        const expiresInDuration = res.expiresIn;
        this.vendorAuth = true;
        this.setAuthTimer(expiresInDuration);
        this.vendorAuthStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime()+expiresInDuration);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/vendor'])
      }else{
        Swal.fire('Invalid credential')
      }
    })
  }
  getToken(){
    return this.token;
  }
  getAuthStatusListener(){
    return this.vendorAuthStatusListener.asObservable();
  }
  getIsAuth(){
    return this.vendorAuth
  }

  logout(){
    this.token=null;
    this.vendorAuth=false;
    this.vendorAuthStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }
  private getAuthData(){
    const token = localStorage.getItem('vendorToken');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
  private setAuthTimer(duration: number){
    this.tokenTimer=setTimeout(()=>{
      this.logout();
    },duration*1000)
  }
  private saveAuthData(token:string,expirationDate:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('role','vendor');
    localStorage.setItem('expiration',expirationDate.toISOString());
  }
  private clearAuthData(){
    localStorage.removeItem('vendorToken')
    localStorage.removeItem('expiration')
    localStorage.removeItem('role')

  }
}
