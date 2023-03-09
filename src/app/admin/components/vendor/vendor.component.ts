import { VendorService } from './../../services/vendor.service';
import { iVendorProfile } from './../../models/vendor.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  
  vendors: iVendorProfile[] | undefined | null;
  
  constructor(private VendorService: VendorService) { }
  
  ngOnInit(): void {
    this.getAllVendors();
  }
  
  blockVendor(id:string | undefined | null){
    Swal.fire({
      title: 'Are you sure to block?',
      text: "Vendor will be blocked!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.VendorService.blockVendor(id).subscribe((res) => {
          if (res.status == true){
            const vendor=this.vendors?.find(e => {return e._id == id})
            if (vendor) {
              vendor.isBlocked = true
            }
          }
        })
        Swal.fire(
          'Blocked!',
          'Vendor has been blocked.',
          'success'
        )
      }
    })
  }
  unblockVendor(id:string | undefined | null){
    Swal.fire({
      title: 'Are you sure to unblock?',
      text: "vendor will be unblocked!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Unblock!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.VendorService.unblockVendor(id).subscribe((res) => {
          if (res.status == true){
            const vendor=this.vendors?.find(e => {return e._id == id})
            if (vendor) {
              vendor.isBlocked = false
            }
          }
        })
        Swal.fire(
          'Unblocked!',
          'vendor has been unblocked.',
          'success'
        )
      }
    })
  }
  getAllVendors(){
    this.VendorService.fetchVendors().subscribe((res) => {
      this.vendors = res.vendor
    })
  }
}
