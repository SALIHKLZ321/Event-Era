import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  tickets!: any[];
  constructor(private _userService: UserService){}
  ngOnInit(): void {
    this.fetchTickets();
  }
  fetchTickets(){
    this._userService.fetchProfile().subscribe((res) => {
      this.tickets = res.tickets
    })
  }

}
