import { ievent } from './../../models/event-vendor.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service'

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eventId: string | undefined;
  event: ievent | undefined;

  constructor(private _eventService: EventService, private _activatedRoute: ActivatedRoute) { 
    this._activatedRoute.params.subscribe((params) => {
      this.eventId = params['id'];
    })
  }

  ngOnInit(): void {
    this.fetchEventDetails();
  }
  fetchEventDetails(){
    if(this.eventId){
      this._eventService.fetchEventDetails(this.eventId).subscribe((res) => {
        this.event = res.event;
      })
    }
  }

}
