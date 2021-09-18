import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router) {}

  loginForm:FormGroup;
  errorMessage:any ='';

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email":new FormControl(null , [Validators.required ,Validators.email] ),
      "password":new FormControl(null , [Validators.required ] )
    })

    if (this._AuthService.currentUser.getValue() != null) {
      this._Router.navigate(['/home'])
    }
  }

  togglePassword(){
    if ($('#pw').attr('type') == 'password') {
      $('#pw').attr('type','text');   
    }
    else {
      $('#pw').attr('type','password');   
    }
  }

  onSubmit(data){
    if(data.valid){
      this._AuthService.signIn(data.value)
        .subscribe( 
        res =>{
          this.errorMessage = null;
          this._AuthService.saveUser(res.username, res.token, res.roles, res.expiresOn, res.email, res.userId, res.phoneNumber, res.firstName , res.lastName);
          $('button#signIn').html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`)
        },
        err =>{
              this.errorMessage = err.error;
              setTimeout(() => {
                console.clear();
              }, 1);
            },
            () => {
            this._Router.navigate(['/home'])
          }
        )
    }
    else{
      $('button#signIn').html(`Error Occurred!`);
    }
  }

}
