import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { loginForm } from '../models/adminLogin';
import  Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private adminToken:string | undefined | null;
  adminAuth = false;
  private tokenTimer:any;
  adminAuthStatusListener =new Subject<boolean>()

  constructor(private http: HttpClient, private router: Router) { }
  
  adminLogin(form:loginForm){
    this.http.post<{status:string, message:string, token:string, expiresIn:number}>(`${environment.apiUrl}/admin/login`, form)
    .subscribe((res) => {
      const token = res.token;
      this.adminToken = token;
      if (token) {
        const expiresInDuration = res.expiresIn;
        this.adminAuth = true;
        this.setAuthTimer(expiresInDuration);
        this.adminAuthStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime()+expiresInDuration);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/admin']);
      }
    })
  }
  getToken(){
    return this.adminToken;
  }
  getAuthStatusListener(){
    return this.adminAuthStatusListener.asObservable();
  }
  getIsAuth(){
    return this.adminAuth;
  }
  private getAuthData(){
    const token = localStorage.getItem('adminToken');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate){
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    }
  }
  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    },duration*1000)
  }
  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('adminToken',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
  }
  private clearAuthData(){
    localStorage.removeItem('adminToken');
    localStorage.removeItem('expiration');
  }
  logout(){
    this.adminAuth = false;
    this.adminToken = null;
    this.adminAuthStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }
}
