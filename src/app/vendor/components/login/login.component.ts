import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(4)])
  })
  constructor( private loginService: LoginRegisterService) { }

  ngOnInit(): void {
  }
  onLogin(){
    const form = {
      email: this.loginform.value.email,
      password: this.loginform.value.password
    }
    this.loginService.loginVendor(form)
  }
  get formValues() {
    return this.loginform.controls;
  }
}
