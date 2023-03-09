import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ievent } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventUploadService {
  
  constructor(private http: HttpClient) {}
  
  eventUpload(form:ievent){
   this.http.post<{status: boolean}>(`${environment.apiUrl}/vendor/event-upload`, form).subscribe((res) => {

   })
  }
  fetchEvents(){
    return this.http.get<{events: ievent[]}>(`${environment.apiUrl}/vendor/events`)
  }
}
