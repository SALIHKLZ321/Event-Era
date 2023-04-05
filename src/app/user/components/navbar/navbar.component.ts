import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {  ElementRef } from "@angular/core";
import { LoginRegisterService } from 'src/app/user/services/login-register.service';
import { iProfile } from '../../models/profile.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy  {
  private authListenerSubs:Subscription | undefined;
  user: iProfile | undefined;
  userAuth=false;
   
  isList: number | undefined ;
  isMenu: boolean = false;
  isSearch: boolean = false;

  constructor(private el:ElementRef,private authService:LoginRegisterService) { }
  
  ngOnInit(): void {
    this.userAuth = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userAuth = isAuthenticated;
    })
  }
  
  onLogout(){
    this.authService.logout()
  }
  
  ngOnDestroy(): void {
    this.authListenerSubs?.unsubscribe()
  }
  

}
