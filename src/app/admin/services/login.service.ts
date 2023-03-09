import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { iLoginForm } from '../models/adminLogin';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token:string | undefined | null;
  adminAuth = false;
  private tokenTimer:any;
  adminAuthStatusListener =new Subject<boolean>()

  constructor(private http: HttpClient, private router: Router) { }
  
  adminLogin(form:iLoginForm){
    this.http.post<{status:string, message:string, token:string, expiresIn:number}>(`${environment.apiUrl}/admin/login`, form)
    .subscribe((res) => {
      const token = res.token;
      this.token = token;
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
    return this.token;
  }
  getAuthStatusListener(){
    return this.adminAuthStatusListener.asObservable();
  }
  getIsAuth(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const role = localStorage.getItem('role')
    if (!token || !expirationDate || role != 'admin'){
      return false;
    }
    return true
  }
  private getAuthData(){
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate || role != 'admin'){
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
    localStorage.setItem('token',token);
    localStorage.setItem('role','admin');
    localStorage.setItem('expiration',expirationDate.toISOString());
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('expiration');
  }
  logout(){
    this.adminAuth = false;
    this.token = null;
    this.adminAuthStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/admin/login']);
  }
}
