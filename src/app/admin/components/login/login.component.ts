import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms'
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  onLogin(){
    const form={
      email: this.loginform.controls.email.value,
      password: this.loginform.controls.password.value
    }
    this.loginService.adminLogin(form)
  }
  get formValues(){
    return this.loginform.controls
  }

}
