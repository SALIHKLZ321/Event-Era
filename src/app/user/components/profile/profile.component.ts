import { Component, OnInit } from '@angular/core';
import { iUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: iUser ;
  tickets!: any[];
  wallet: any;
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.fetchProfile();
  }
  fetchProfile(){
    this._userService.fetchProfile().subscribe((res) => {
      this.user = res.user
      console.log(res.tickets);
      this.tickets = res.tickets
    })
  }
  parentFunc(total: number){
    alert(total)
    this.user.wallet = this.user.wallet + total
    
  }
  

}
