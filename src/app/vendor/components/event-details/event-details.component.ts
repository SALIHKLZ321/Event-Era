import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iEvent } from '../../models/event.model';
import { EventUploadService } from '../../services/event-upload.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogActions,
} from '@angular/material/dialog';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { iTicket } from '../../models/ticket.model';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId! : string;
  event! : iEvent;
  tickets!: iTicket[];
  constructor(private _activatedRoute: ActivatedRoute, private _eventService: EventUploadService, private _matDialog: MatDialog){
    this._activatedRoute.params.subscribe((params) =>{
      this.eventId = params['id']
    })
  }
  ngOnInit(): void {
      this.fetchEventDetails()
  }
  fetchEventDetails(){
    this._eventService.fetchEventDetails(this.eventId).subscribe((res)=>{
      this.event = res.event
      console.log(res.event);
      this.fetchTickets();
    })
  }
  fetchTickets(){
    
    this._eventService.fetchEventTickets(this.event._id).subscribe((res) => {
      this.tickets =  res.tickets
    })
  }
  openModal(){
    const event=this.event;
    this._matDialog.open(EventEditComponent, {
      data: {
        event
      },
    });
  }

}
