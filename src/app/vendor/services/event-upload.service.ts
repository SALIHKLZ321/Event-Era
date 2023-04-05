import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ievent, iEvent } from '../models/event.model';
import { iTicket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class EventUploadService {
  
  constructor(private http: HttpClient ,private router: Router) {}
  
  eventUpload(form:ievent){
   this.http.post<{status: boolean}>(`${environment.apiUrl}/vendor/event-upload`, form).subscribe((res) => {
    this.router.navigate(['/vendor/events'])
   })
  }
  fetchEvents(){
    return this.http.get<{events: iEvent[]}>(`${environment.apiUrl}/vendor/events`)
  }
  fetchEventDetails(id: string) {
    return this.http.get<{event: iEvent}>(`${environment.apiUrl}/vendor/event-detail?id=${id}`)
  }
  eventUpdate(form: iEvent){
    return this.http.put<{status: boolean}>(`${environment.apiUrl}/vendor/event-update`, form)
  }
  fetchEventTickets(id: string){
    return this.http.get<{tickets: iTicket[]}>(`${environment.apiUrl}/vendor/event-tickets?id=${id}`)
  }
}
