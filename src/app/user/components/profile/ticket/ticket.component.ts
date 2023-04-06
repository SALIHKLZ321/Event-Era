import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Output() parentFun: EventEmitter<number> = new EventEmitter();
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
  cancelEvent(id: string){
    Swal.fire({
      title: 'Are you sure to cancel?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {

      if (result.isConfirmed) {
        this._userService.cancelEvent(id).subscribe((res) => {
          if(res.status == true){
            this.tickets.map((t) => {
              if(t._id == id){
                t.status = 'Cancelled'
                this.parentFun.emit(t.total)
              }
            })
          }
        })
        Swal.fire(
          'Canceled!',
          'Your ticket has been Canceled.',
          'success'
        )
      }
    })
  }

}
