import Swal  from 'sweetalert2';
import { VendorService } from './../../services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { iRes, iVendorProfile } from '../../models/vendor.model';

@Component({
  selector: 'app-vendor-request',
  templateUrl: './vendor-request.component.html',
  styleUrls: ['./vendor-request.component.css']
})
export class VendorRequestComponent implements OnInit {
  
  constructor(private VendorService: VendorService) { }
  pendingVendors: iVendorProfile[] | undefined;
  vendor: boolean | undefined;

  ngOnInit(): void {
    this.fetchVendors();
  }
 
  fetchVendors(){
    this.VendorService.nonVerifiedVendor().subscribe((res) => {
      this.pendingVendors=res.vendor;
      this.vendor = true;
      if (res.vendor.length == 0 ) {
        this.vendor = false;
      }
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
        this.VendorService.verifyVendor(id).subscribe((res) => {
          let i=0
          if (res.status == true) {
            const vendor=this.pendingVendors?.find(e => { 
              i++;
              return e._id == id
            } );
          }
          this.pendingVendors?.splice(i-1,1);
          if (this.pendingVendors?.length == 0) {
            this.vendor = false;
          }
        })
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
