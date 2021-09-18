import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../Services/auth.service';
import { ProfileService } from '../Services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user:any[];
  profileImageUrl:string;
  UserNameForm: FormGroup;
  PhoneForm: FormGroup;
  PasswordForm: FormGroup;
  ProfileForm: FormGroup;
  ProfileImage: FormGroup;
  selectedFile:File = null;

  constructor(
    private _AuthService:AuthService,
    private _ProfileService:ProfileService,
    private _Router:Router,
    private _ToastyService:ToastyService
  ) { }

  ngOnInit(): void {
    this.CheckAuth();
    this.getProfileById();
    this.addUserNameForm();
    this.addPhoneForm();
    this.addPasswordForm();
    this.addProfileForm();
    this.addProfileImage();
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
      this.addUserNameForm(res.userName);
      this.addPhoneForm(res.phoneNumber);
      this.addProfileForm(res.firstName, res.lastName, res.country, res.gender);
      this.profileImageUrl = res.profileImageUrl;
    })
  }

  readURL(input){
    if (input.files && input.files[0]) {
      this.selectedFile = input.files.item(0);
      var reader = new FileReader();
      reader.onload = function (e) {
          $('.avatar').attr('src', e.target.result);
      }
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addUserNameForm(FormData:string = null){
    this.UserNameForm = new FormGroup({
      "userName": new FormControl(FormData, [Validators.required])
    });
  }

  updateUserName(data:string){
    this._ProfileService.updateUserName(this.user[5],data).subscribe(()=>{
      this._Router.navigate(['/profile']);
      this._ToastyService.success({title:'Edit User Profile',msg:'Username updated successfully.',theme:'bootstrap',showClose:true,timeout:3000})
      let user = JSON.parse(localStorage.getItem("userInfo"));
      this._AuthService.saveUser(data, user[1], user[2], user[3], user[4], user[5], user[6],user[7], user[8])
    },err=>{
      console.log(err)
      this._ToastyService.error({title:'Edit User Profile',msg:err.error ,theme:'bootstrap',showClose:true,timeout:3000})
    })
  }

  addPhoneForm(FormData:string = null){
    this.PhoneForm = new FormGroup({
      "PhoneNumber": new FormControl(FormData, [Validators.required])
    });
  }

  updatePhoneNumber(data:string){
    this._ProfileService.updatePhoneNumber(this.user[5],data).subscribe(()=>{
      this._Router.navigate(['/profile']);
      this._ToastyService.success({title:'Edit User Profile',msg:'Phone number updated successfully.',theme:'bootstrap',showClose:true,timeout:3000})
      let user = JSON.parse(localStorage.getItem("userInfo"));
      this._AuthService.saveUser(user[0],user[1],user[2],user[3],user[4],user[5], data, user[7], user[8])
    },err=>{
      console.log(err)
      this._ToastyService.error({title:'Edit User Profile',msg:err.error ,theme:'bootstrap',showClose:true,timeout:3000})
    })
  }

  addPasswordForm(FormData:string = null){
    this.PasswordForm = new FormGroup({
      "CurrentPassword": new FormControl(FormData, [Validators.required]),
      "NewPassword": new FormControl(FormData, [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
    });
  }

  updatePassword(data:string){
    this._ProfileService.updatePassword(this.user[5],data[0], data[1]).subscribe(()=>{
      this._Router.navigate(['/profile']);
      this._ToastyService.success({title:'Edit User Profile',msg:'Password updated successfully.',theme:'bootstrap',showClose:true,timeout:3000})
    },err=>{
      console.log(err)
      this._ToastyService.error({title:'Edit User Profile',msg:err.error ,theme:'bootstrap',showClose:true,timeout:3000})
    })
  }

  addProfileForm(FirstName:string = null , LastName:string = null, Country:string = '20' , Gender:string = null){
    this.ProfileForm = new FormGroup({
      "FirstName": new FormControl(FirstName, [Validators.required]),
      "LastName": new FormControl(LastName, [Validators.required]),
      "Country": new FormControl(Country, [Validators.required]),
      "Gender": new FormControl(Gender, [Validators.required])
    });
  }

  UpdateProfile(data){
    this._ProfileService.updateProfile(data,this.user[5]).subscribe(()=>{
      this._Router.navigate(['/profile']);
      this._ToastyService.success({title:'Edit User Profile',msg:'Profile updated successfully.',theme:'bootstrap',showClose:true,timeout:3000})
      let user = JSON.parse(localStorage.getItem("userInfo"));
      this._AuthService.saveUser(user[0],user[1],user[2],user[3],user[4],user[5], user[6], data.FirstName, data.LastName)
    },err=>{
      console.log(err)
      this._ToastyService.error({title:'Edit User Profile',msg:err.error ,theme:'bootstrap',showClose:true,timeout:3000})
    })
  }

  addProfileImage(file:string = null){
    this.ProfileImage = new FormGroup({
      "file": new FormControl(file, [Validators.required])
    });
  }

  UpdateProfileImage(data){
    if (data.valid) {
      let formData: FormData;
      formData = new FormData();
      formData.append('file', this.selectedFile);
      this._ProfileService.updateProfileImage(formData,this.user[5]).subscribe(()=>{
        this._Router.navigate(['/profile']);
        this._ToastyService.success({title:'Edit User Profile',msg:'Profile Image updated successfully.',theme:'bootstrap',showClose:true,timeout:3000})
      },err=>{
        console.log(err)
        this._ToastyService.error({title:'Edit User Profile',msg:err.error ,theme:'bootstrap',showClose:true,timeout:3000})
      })
    }
  }

}
