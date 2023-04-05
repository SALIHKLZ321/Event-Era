import { iEventVendor } from './../../../vendor/models/event.model';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { VendorService } from '../../services/vendor.service';
import { iVendorEvents } from 'src/app/vendor/models/vendor.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events!: iEventVendor[];
  vendors!: iVendorEvents[]
  constructor(private _eventService: EventService, private _vendorService: VendorService ) { }

  ngOnInit(): void {
    this.fetchAllEvents()
    this.fetchAllVendors()
  }
  fetchAllEvents(){
    this._eventService.fetchAllEvents().subscribe((res) => {
      this.events=res.events
    })
  }
  fetchAllVendors(){
    this._vendorService.fetchAllVendors().subscribe((res) => {
      console.log(res.vendors);
      
      this.vendors = res.vendors
    })
  }
  hostedEvents(){
    this.vendors.forEach((v) => {
      this.events.forEach
    })
  }
  

}
