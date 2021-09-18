import { Component, OnInit } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { ProductsService } from '../Services/products.service';
import { ProfileService } from '../Services/profile.service';

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false;
  userName:Observable<any>;
  Products:Observable<any>;
  FavouriteProducts:Observable<any>;
  isSuperAdmin:boolean = false;
  isAdmin:boolean = false;
  
  constructor(
    private _AuthService:AuthService,
    private _ProfileService:ProfileService,
    private _ProductsService:ProductsService
    ) {}

  ngOnInit(): void {
    this.isAuth();
    this.getCurrentUser();
    this.getCurrentItemsInCart();
    this.getCurrentItemsInWishList();
  }

  sidebarCollapse(){
    $('#sidebar').toggleClass('active');
  }

  onLogOut(){
    this._AuthService.logOut();
    this.userName = null;
  }

  getCurrentUser(){
    this._AuthService.currentUser.subscribe((data)=>{
      if (data == null) {
        this.isLogin = false;
      }
      else{
        this.isLogin = true;
        this.userName = data[0]
      }
    })
  }

  getCurrentItemsInCart(){
    this._ProductsService.CurrentProducts.subscribe( res => {
      this.Products = res
    })
  }

  getCurrentItemsInWishList(){
    this._ProductsService.CurrentFavouriteProducts.subscribe( res => {
      this.FavouriteProducts = res
    })
  }

  isAuth(){
    this._AuthService.currentUser.subscribe((data)=>{
      if (data != null) {
        if (data[2][1] == "SuperAdmin" || data[2][2] == "SuperAdmin") {
          this.isSuperAdmin = true;
          this.isAdmin = true;
        }
        else if (data[2][1] == "Admin") {
          this.isAdmin = true;
        }
        else {
          this.isSuperAdmin = false;
          this.isAdmin = false;
        }
      }
    })
  }

}
