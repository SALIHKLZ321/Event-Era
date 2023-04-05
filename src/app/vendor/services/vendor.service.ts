import { iVendor } from './../models/vendor.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }
  fetchVendors(){
   return this.http.get<{vendor: iVendor}>(`${environment.apiUrl}/vendor/profile`)
  }
  profilePicUpload(url: string){
    return this.http.patch<{url: string}>(`${environment.apiUrl}/vendor/profile-pic-upload`, { url })
  }
  graphValues(){
    return this.http.get<{eventNames: string[],eventCollection: string[],eventSlots: string[],eventSold: string[]}>(`${environment.apiUrl}/vendor/graph-values`)
  }
}
