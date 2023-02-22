import Swal  from 'sweetalert2';
import { VendorService } from './../../services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { res, vendorProfile } from '../../models/vendor.model';

@Component({
  selector: 'app-vendor-request',
  templateUrl: './vendor-request.component.html',
  styleUrls: ['./vendor-request.component.css']
})
export class VendorRequestComponent implements OnInit {
  menu=false;
  constructor(private VendorService: VendorService) { }
  pendingVendors:vendorProfile[] | undefined;

  ngOnInit(): void {
    this.fetchVendors();
  }
  menuToggle(){
    this.menu = !this.menu
  }
  fetchVendors(){
    this.VendorService.nonVerifiedVendor().subscribe((res) => {
      this.pendingVendors=res.vendor
     })
  }
  acceptRequest(id:string | null | undefined){
    Swal.fire({
      title: 'Are you sure to Approve?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve !'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Approved!',
          'This vendor Verified.',
          'success'
        )
      }
    })
  }
  rejectRequest(id:string | null | undefined){
    Swal.fire({
      title: 'Are you sure to Reject?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reject !'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire(
          'Rejected!',
          'This vendor Verified.',
          'success'
        )
      }
    })
  }
  

}
