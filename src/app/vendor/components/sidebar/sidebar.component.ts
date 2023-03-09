import { LoginRegisterService } from '../../services/login-register.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu=false;
  constructor(private _loginService: LoginRegisterService ) { }

  ngOnInit(): void {
  }
  open(){
    this.menu = true;
  }
  close () {
    this.menu = false;
  }
  logout (){
    this._loginService.logout();
  }

}
