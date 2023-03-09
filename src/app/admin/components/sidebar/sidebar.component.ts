import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu = false
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.logout()
  }
  open() {
    this.menu = true;
  }
  close() {
    this.menu = false;
  }
}
