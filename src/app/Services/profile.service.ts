import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducts, ProductsRate } from '../Interfaces/Iproducts';
import { ToastyService } from 'ng2-toasty';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.baseUrl

  constructor(
    private _HttpClient: HttpClient,
    private _ToastyService:ToastyService
    ){ }

  getUserProfileByEmail(email:string): Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/Profile/getUserProfileByEmail?email=${email}`);
  }

  updateUserName(UserId:string, Username:string): Observable<any>{
    const body = { Username: Username , UserId: UserId };
    return this._HttpClient.put(`${this.baseUrl}/Profile/updateUserName`, body);
  }

  updatePhoneNumber(UserId:string, PhoneNumber:string): Observable<any>{
    const body = { PhoneNumber: PhoneNumber , UserId: UserId };
    return this._HttpClient.put(`${this.baseUrl}/Profile/updatePhoneNumber`, body);
  }

  updatePassword(UserId:string, CurrentPassword:string, NewPassword:string): Observable<any>{
    const body = { CurrentPassword: CurrentPassword ,  NewPassword: NewPassword , UserId: UserId };
    return this._HttpClient.put(`${this.baseUrl}/Profile/updatePassword`, body);
  }

  updateProfile(data,UserId:string): Observable<any>{
    const body = { FirstName: data.FirstName, LastName: data.LastName, Country: data.Country, Gender: data.Gender , UserId: UserId };
    return this._HttpClient.put(`${this.baseUrl}/Profile/UpdateProfile`, body);
  }

  updateProfileImage(formData:FormData,UserId): Observable<any>{
    let params = new HttpParams();
    params = params.append('UserId', UserId);
    return this._HttpClient.put(`${this.baseUrl}/Profile/UpdateProfileImage`, formData, { params });
  }
}