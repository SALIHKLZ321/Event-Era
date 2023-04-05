import { iVendorProfile } from './../models/vendor.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ievent } from '../models/event.model';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private _http: HttpClient) { }
  fetchAllVendors(){
    return this._http.get<{vendors: iVendorProfile[]}>(`${environment.apiUrl}/user/get-all-vendors`)
  }
  vendorDetails(id: string){
    return this._http.get<{ vendor: iVendorProfile }>(`${environment.apiUrl}/user/vendor-details?id=${id}`)
  }
  vendorEvents(id: string){
    return this._http.get<{ events: ievent[]}>(`${environment.apiUrl}/user/vendor-events?id=${id}`)
  }
  
}
