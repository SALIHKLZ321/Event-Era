import { registrationForm } from '../../models/user.model';
import { LoginRegisterService } from './../../services/login-register.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { FormArray,FormGroup,FormControl,FormControlName,Validators} from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
 
  registerForm=new FormGroup({
    fname: new FormControl('',[Validators.required,Validators.minLength(3)]),
    lname: new FormControl('',[Validators.required,Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',[Validators.required,Validators.max(9999999999),Validators.min(1000000000)]),
    password:new FormControl('',[Validators.required]),
    confirm:new FormControl('',[Validators.required]),
  })
  
  constructor(private registerService:LoginRegisterService) { }

  ngOnInit(): void {
  }
  onRegister(){
    if(this.registerForm.invalid){
      return;
    }
    const form:registrationForm={
      fname:this.registerForm.value.fname,
      lname:this.registerForm.value.lname,
      email:this.registerForm.value.email,
      phone:this.registerForm.value.phone,
      password:this.registerForm.value.password,
    }
    this.registerService.register(form)
   
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
