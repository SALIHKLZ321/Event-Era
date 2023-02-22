import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm=new FormGroup({
    fname:new FormControl('',[Validators.minLength(3),Validators.required]),
    lname:new FormControl('',[Validators.minLength(3),Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.min(1000000000),Validators.max(9999999999),Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(4)]),
    confirm:new FormControl('',[Validators.required]),
  })
  constructor(private registerService:LoginRegisterService) { }

  ngOnInit(): void {
  }
  onRegister(){
    if(this.registerForm.invalid){
      return;
    }
    const form={
      fname:this.registerForm.controls.fname.value,
      lname:this.registerForm.controls.lname.value,
      email:this.registerForm.controls.email.value,
      phone:this.registerForm.controls.phone.value,
      password:this.registerForm.controls.password.value,
    }
    this.registerService.registerVendor(form)
  }
  get formValues(){
    return this.registerForm.controls;
  }
  get confirmP(){
    return this.registerForm.controls.confirm.errors
  }
  confirmPassword(){
    console.log(this.confirmP);
    const passwordControl=this.registerForm.controls['password'];
    const confirmControl=this.registerForm.controls['confirm'];
    if(passwordControl.value!==confirmControl.value){
      confirmControl.setErrors({mustMatch:true})
    }else{
      confirmControl.setErrors(null)
    }
  }
}
