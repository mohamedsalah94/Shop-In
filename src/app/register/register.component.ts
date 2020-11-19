import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register :FormGroup = new FormGroup({
    'email' : new FormControl(null, [Validators.required,Validators.email]),
    'password' : new FormControl(null,[Validators.pattern(/^[A-Za-z\d]{3,}$/),Validators.required]),
    'confirm_password' : new FormControl(null,[Validators.pattern(/^[A-Za-z\d]{3,}$/),Validators.required]),
    'country' : new FormControl(null,[Validators.required]),
    'first_name' : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Za-z\d]{3,}$/),Validators.required]),
    'last_name' : new FormControl(null,[Validators.required ,Validators.pattern(/^[A-Za-z\d]{3,}$/),Validators.required]),
  })
  
  getRegister(register){
    if (register.valid) {
      console.log(register.value);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
