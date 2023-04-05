import { environment } from './../../../environments/environment';
import { iEvent, iEventVendor } from './../../vendor/models/event.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http: HttpClient) { }
  fetchAllEvents(){
    return this._http.get<{events: iEventVendor[]}>(`${environment.apiUrl}/admin/fetch-all-events`)
  }
}
