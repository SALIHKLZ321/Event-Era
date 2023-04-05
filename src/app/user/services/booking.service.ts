import { iUser } from '../models/user.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ievent } from '../models/event-vendor.model';
import { iTicket } from '../models/ticketModel';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http:  HttpClient) { }
  fetchBookingDetails(id: string){
    return this._http.get<{event: ievent,user: iUser}>(`${environment.apiUrl}/user/booking-details?id=${id}`)
  }
  bookTicket(data: iTicket){
    return this._http.post<{status: boolean}>(`${environment.apiUrl}/user/book-ticket`, data)
  }
}
