import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from '../Services/auth.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardGuard implements CanActivate {
  constructor(private _AuthService:AuthService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this._AuthService.currentUser.subscribe((data)=>{
        if (data == null) {
            this.router.navigate(['/home'])
            return false;
        }
        else {
            if (data[2][1] == "Admin" || data[2][1] == "SuperAdmin") {
                return true;
            }
            else {
                this.router.navigate(['/home'])
                return false;
            }
        }
      })
      
      return true;

  }
}
