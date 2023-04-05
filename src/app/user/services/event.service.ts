import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ievent } from '../models/event-vendor.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http: HttpClient) { }
  fetchAllActiveEvents(){
    return this._http.get<{events: ievent[]}>(`${environment.apiUrl}/user/fetch-active-events`)
  }
  fetchEventDetails( id: string ){
    console.log(id);
    
    return this._http.get<{event: ievent}>(`${environment.apiUrl}/user/event-details?id=${id}`)
  }
  fetchUpcomingFirstEvent(){
    return this._http.get<{event:ievent}>(`${environment.apiUrl}/user/upcoming-first-event`)
  }
}
