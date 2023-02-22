import { VendorService } from './../../services/vendor.service';
import { vendorProfile } from './../../models/vendor.model';
import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  menu = false;
  vendors: vendorProfile[] | undefined | null;
  
  
  constructor(private VendorService: VendorService) { }
  
  ngOnInit(): void {
    this.getAllVendors();
  }
  
  menuToggle(){
    this.menu = !this.menu
  }
  blockVendor(id:string | undefined | null){

  }
  unblockVendor(id:string | undefined | null){

  }
  getAllVendors(){
    this.VendorService.fetchVendors().subscribe((res) => {
      this.vendors = res.vendor
    })
  }

}
