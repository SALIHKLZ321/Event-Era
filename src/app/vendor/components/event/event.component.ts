import { EventUploadService } from './../../services/event-upload.service';
import { ievent } from './../../models/event.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: ievent[] | null | undefined
  constructor(private _eventService: EventUploadService) { }

  ngOnInit(): void {
    this.fetchEvents();
  }
  fetchEvents(){
    this._eventService.fetchEvents().subscribe((res) => {
      this.events=res.events
      console.log(res);
      
    })
  }

}
