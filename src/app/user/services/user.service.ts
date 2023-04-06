import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  fetchProfile(){
    return this._http.get<{user: iUser, tickets: any[]}>(`${environment.apiUrl}/user/profile`)
  }
  cancelEvent(id: string){
    return this._http.post<{status: boolean}>(`${environment.apiUrl}/user/cancel-ticket`,{id})
  }
}
