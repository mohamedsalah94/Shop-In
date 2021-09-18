import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators ,FormBuilder} from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmedValidator } from './ConfirmedValidator';

declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  ErrorMessage:string;
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private _AuthService:AuthService,
    private _Router:Router,
    private _ToastyService:ToastyService,
    private _FormBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getRegisterForm();
  }

  getRegisterForm(){
    this.registerForm = this._FormBuilder.group({
      email:new FormControl(null , [Validators.required ,Validators.email] ),
      country : new FormControl(null,[Validators.required]),
      firstName:new FormControl(null , [Validators.required ] ),
      lastName:new FormControl(null , [Validators.required ] ),
      termsAndConditions:new FormControl(null , [Validators.required ] ),
      password:new FormControl(null , [Validators.required , Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')] ),
      confirm_password:new FormControl(null , [Validators.required])
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }
  
  
  onSubmit(data){
    if (data.valid) {
      console.log(data.value);
      this._AuthService.signUp(data.value).subscribe( () => {
        $('form button#submit').html(`Waiting... <i class="fas fa-spinner fa-pulse ml-2"></i>`);
          this._ToastyService.success({title:'Register attempt',msg:'successfully registered',theme:'bootstrap',showClose:true,timeout:2000})
          this._Router.navigate(["/login"])
      },
      err=>{
          this._ToastyService.error({title:'Invalid register attempt',msg:'Error Occurred while trying to register',theme:'bootstrap',showClose:true,timeout:2000})
          this.ErrorMessage = err.error.title;
        });
    }
  }

  togglePassword($event){
    $($event.target).toggleClass("fa-eye fa-eye-slash");
    let input = $($event.target.offsetParent.children[0]);
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  }

}