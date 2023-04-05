import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private _router: Router) { }
  
  getAuthDetails(){
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || !role) {
      return null
    }
    return {
      token, role
    }
  }
  logout(){
    const role=localStorage.getItem('role')
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('role')
    if(role=='user'){
      this._router.navigate(['/login']);
    }
    if(role=='vendor'){
      this._router.navigate(['/vendor/login']);
    }
    if(role=='admin'){
      this._router.navigate(['/admin/login']);
    }
  }
}
