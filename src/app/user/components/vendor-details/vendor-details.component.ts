import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ievent } from '../../models/event.model';
import { iVendorProfile } from '../../models/vendor.model';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {
  vendorId: string | undefined;
  vendor: iVendorProfile | undefined;
  events: ievent[] | null | undefined;
  constructor(private _vendorService: VendorService, private _activatedRoute: ActivatedRoute) { 
    this._activatedRoute.params.subscribe((params) => {
      this.vendorId = params['id'];
    })
  }

  ngOnInit(): void {
    if(this.vendorId){
      this.vendorDetails(this.vendorId);
      this.vendorEvents(this.vendorId);
    }
    
  }
  vendorDetails(id: string){
    this._vendorService.vendorDetails(id).subscribe((res) => {
      this.vendor = res.vendor
    })
  }
  vendorEvents(id: string){
    this._vendorService.vendorEvents(id).subscribe((res) => {
      this.events = res.events;
    })
  }
  getUrl(id:any){
    return `/chat/${id}`
  }

}
