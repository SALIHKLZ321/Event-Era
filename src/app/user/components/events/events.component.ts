import { Component, OnInit } from '@angular/core';
import { ievent } from '../../models/event-vendor.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: ievent[] | undefined;
  searchData: string = '';
  constructor(private _eventService: EventService) { }

  ngOnInit(): void {
    this.fetchEvents();
  }
  fetchEvents(){
    this._eventService.fetchAllActiveEvents().subscribe((res) => {
      this.events = res.events;
    })
  }

}
