import { iEvent } from './../../../models/event.model';
import { EventUploadService } from './../../../services/event-upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dropDownList: any;
  events!: iEvent[];
  totalEvents!: number;
  totalWallet : number=0;
  ticketSold : number = 0;
  constructor(private _eventService: EventUploadService){}
  ngOnInit() {
    this.fetchEvents()
  }
  fetchEvents(){
    this._eventService.fetchEvents().subscribe((res)=> {
      this.events = res.events
      this.totalEvents = res.events.length;
      this.fillFields();
    })
  }
  fillFields(){
    this.events.map((e) => {
      if(e.sold && e.price){
        this.ticketSold=this.ticketSold + e.sold;
        this.totalWallet = this.totalWallet + (parseInt(e.price) * e.sold)
      }
    })
  }

}
