import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../Services/auth.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  token:any;
  constructor(private _AuthService:AuthService) {
      _AuthService.currentUser.subscribe( res =>{
        if (res == null) {
          this.token = [''];
        } else {
          this.token = res;
        }
    })
    }



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const HttpHeader = request.clone({
      headers: request.headers.set("Authorization",`bearer ${this.token[1]}`)
    })
    return next.handle(HttpHeader);
  }
}
