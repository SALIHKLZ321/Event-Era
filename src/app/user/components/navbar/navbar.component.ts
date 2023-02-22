import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {  ElementRef } from "@angular/core";
import { LoginRegisterService } from 'src/app/user/services/login-register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy  {
  private authListenerSubs:Subscription | undefined;
  userAuth=false;
 userMenu=true;
 mainMenu=true;

  constructor(private el:ElementRef,private authService:LoginRegisterService) { }
  
  ngOnInit(): void {
    this.userAuth = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userAuth = isAuthenticated;
    })
  }
  
  userMenuOpen(){
    this.userMenu=!this.userMenu;
  }
  mainMenuOpen(){
    this.mainMenu=!this.mainMenu
  }
  onLogout(){
    this.authService.logout()
  }
  
  ngOnDestroy(): void {
    this.authListenerSubs?.unsubscribe()
  }
  

}
