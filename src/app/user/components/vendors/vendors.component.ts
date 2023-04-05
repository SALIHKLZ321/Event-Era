import { Component, OnInit } from '@angular/core';
import { iVendorProfile } from '../../models/vendor.model';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  vendors : iVendorProfile[] | null | undefined;
  constructor(private _vendorService: VendorService) { }

  ngOnInit(): void {
    this.fetchVendors()
  }

  fetchVendors(){
    this._vendorService.fetchAllVendors().subscribe((res) => {
      this.vendors = res.vendors
    })
  }

  getUrl(id:any){
    return `/vendor-details/${id}`
  }

}
