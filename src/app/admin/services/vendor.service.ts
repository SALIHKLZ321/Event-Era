import { res } from './../models/vendor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient ) { }

  nonVerifiedVendor(){
    return this.http.get<res>(`${environment.apiUrl}/admin/non-verified-vendor`)
  }
  fetchVendors(){
    return this.http.get<res>(`${environment.apiUrl}/admin/fetch-vendors`)
  }
}
