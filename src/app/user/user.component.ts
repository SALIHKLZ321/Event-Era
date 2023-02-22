import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from './services/login-register.service';

@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  constructor(private authService:LoginRegisterService) {}
  ngOnInit(): void {
    this.authService.autoAuthUser()
  }
  title = 'Event-Era';
}
