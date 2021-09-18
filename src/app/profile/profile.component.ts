import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../Services/auth.service';
import { ProfileService } from '../Services/profile.service';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any;
  userData:any;

  constructor(
    private _AuthService:AuthService,
    private _ProfileService:ProfileService,
    private _Router:Router,
    private _ToastyService:ToastyService
  ) { }

  ngOnInit(): void {
    this.CheckAuth();
    this.getProfileById();
  }

  CheckAuth() {
    this._AuthService.currentUser.subscribe((data) => {
      if (data == null) {
        this._ToastyService.error({title:'Sign In Validation',msg:'Please login first.',theme:'bootstrap',showClose:true,timeout:3000})
        this._Router.navigate(["/login"]);
      }else{
        this.user = data;
      }
    })
  }

  getProfileById(){
    this._ProfileService.getUserProfileByEmail(this.user[4]).subscribe(res=>{
      this.userData = res;
    })
  }

}
