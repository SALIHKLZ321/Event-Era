import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from 'src/app/user/services/login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(4)])
  })

  constructor(private loginService:LoginRegisterService) { }

  ngOnInit(): void {
  }
  onLogin(){
    const form={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    

    this.loginService.login(form)
  }
  get formValues(){
    return this.loginForm.controls;
  }
}
