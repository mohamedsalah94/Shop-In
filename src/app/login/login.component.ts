import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  Login :FormGroup = new FormGroup({
    'email' : new FormControl(null, [Validators.required,Validators.email]),
    'password' : new FormControl(null,[Validators.pattern(/^[A-Za-z\d]{3,}$/),Validators.required]),
  })
  
  getLogin(Login){
    if (Login.valid) {
      console.log(Login.value);
    }
  }
  constructor() { }

  ngOnInit(): void {
    $('#showPass').click(()=>{
      if ($('#pw').attr('type') == 'password') {
           $('#pw').attr('type','text');   
      } else {
        $('#pw').attr('type','password');   
      }
    })
  }

}
