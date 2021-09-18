import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable , BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject(null);
  baseUrl:string = environment.baseUrl;
  

  constructor(private _HttpClient: HttpClient, private _Router:Router) {
    if (localStorage.getItem(`userInfo`) != null) {
      this.currentUser.next(JSON.parse( localStorage.getItem(`userInfo`)))
    }
  }

  signUp(signUpData): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/Auth/register`,
      signUpData
    );
  }

  signIn(signInData): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/Auth/login`,
      signInData
    );
  }

  saveUser(username, token, roles, expiresOn, email, userId, PhoneNumber, FirstName, LastName) {
    let user:any = [username, token, roles, expiresOn, email, userId, PhoneNumber, FirstName, LastName];
    localStorage.setItem('userInfo',JSON.stringify(user));
    this.currentUser.next(user);
  }

  logOut(){
    this.currentUser.next(null);
    localStorage.removeItem("userInfo");
    this._Router.navigate(['/login']);
  }

  getAllUsers(pageNumber,pageSize):Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Auth/getAllUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getAllAdmins():Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Auth/getAllAdmins`);
  }

  addRoleToUser(data):Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/Auth/addRole`,data,{responseType: 'text'});
  }

  DeleteRoleFromUser(userId:string): Observable<any>{
    let params = new HttpParams();
    params = params.append('id', userId);
    return this._HttpClient.delete(`${this.baseUrl}/Auth/deleteRole`, { params });
  }
}
