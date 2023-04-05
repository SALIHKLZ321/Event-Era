import { ievent } from './../../../models/event-vendor.model';
import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  event!:ievent;
  constructor(private _eventService: EventService){}
  ngOnInit(): void {
      this.upcomingFirstEvent()
  }
  
  upcomingFirstEvent(){
    this._eventService.fetchUpcomingFirstEvent().subscribe((res) => {
      this.event=res.event
    })
  }
}
