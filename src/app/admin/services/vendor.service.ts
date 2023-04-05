import { iVendorEvents } from './../../vendor/models/vendor.model';
import { iRes } from './../models/vendor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient ) { }

  nonVerifiedVendor(){
    return this.http.get<iRes>(`${environment.apiUrl}/admin/non-verified-vendor`)
  }
  fetchVendors(){
    return this.http.get<iRes>(`${environment.apiUrl}/admin/fetch-vendors`)
  }
  blockVendor(id:string | undefined | null){
    const obj={id}
    return this.http.patch<{status:boolean}>(`${environment.apiUrl}/admin/block-vendor`, obj)
  }
  unblockVendor(id:string | undefined | null){
    const obj = { id }
    return this.http.patch<{ status: boolean }>(`${environment.apiUrl}/admin/unblock-vendor`, obj)
  }
  verifyVendor(id:string | undefined | null){
    const obj = { id }
    return this.http.patch<{ status: boolean }>(`${environment.apiUrl}/admin/verify-vendor`, obj)
  }
  fetchAllVendors(){
    return this.http.get<{vendors: iVendorEvents[]}>(`${environment.apiUrl}/admin/fetch-vendors-event`)
  }
}
