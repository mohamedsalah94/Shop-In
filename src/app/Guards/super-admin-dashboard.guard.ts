import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../Services/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminDashboardGuard implements CanActivate {
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
            if (data[2][1] == "SuperAdmin" || data[2][2] == "SuperAdmin") {
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
