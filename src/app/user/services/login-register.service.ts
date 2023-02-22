import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import  Swal from 'sweetalert2';
import { Login } from './login.model';
import { registrationForm } from './user.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  private token:string | undefined | null;
  userAuth = false;
  private tokenTimer: any;
  authStatusListener =new Subject<boolean>()

  constructor(private http:HttpClient , private router:Router) { }
  register(form:registrationForm){
    this.http.post<{sign_up:boolean}>(`${environment.apiUrl}/user/sign-up`, form)
    .subscribe((res) => {
      if( res.sign_up == true ) {
      this.router.navigate(['/login']);
      }else{
        Swal.fire('This email or phone already registered')
      }
    })
  }
  login(form:Partial<Login>){
    this.http.post<{status:string,token:string,expiresIn:number}>(`${environment.apiUrl}/user/sign-in`, form)
    .subscribe((res) => {
      const token = res.token
      this.token = token;
      if(token){ 
        const expiresInDuration=res.expiresIn
        this.userAuth=true
        this.setAuthTimer(expiresInDuration);
        this.authStatusListener.next(true);
        const now=new Date();
        const expirationDate=new Date(now.getTime()+expiresInDuration)
        this.saveAuthData(token,expirationDate)
      this.router.navigate(['/']);
      }
    })
  }
  getToken(){
    return this.token
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable()
  }
  getIsAuth(){
    return this.userAuth
  }
  logout(){
    this.token=null;
    this.userAuth=false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }
  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo){
      return;
    }
    const now=new Date();
    const expiresIn = authInfo!.expirationDate.getTime() - now.getTime();
    if (expiresIn>0) {
      this.token=authInfo!.token;
      this.userAuth=true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }
  private setAuthTimer(duration: number){
    this.tokenTimer=setTimeout(()=>{
      this.logout();
    },duration*1000)
  }
  private saveAuthData(token:string,expirationDate:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
  }
  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
  private clearAuthData(){
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }
}
