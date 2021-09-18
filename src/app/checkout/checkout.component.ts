import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../Services/products.service';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    checkOutPrice:number;
    constructor(
      private _ProductsService:ProductsService,
      private _AuthService:AuthService,
      private _Router:Router,
      private _ToastyService:ToastyService
    ) { }
    
    validationCheckPrice(){
      if (this.checkOutPrice == null) {
        this._Router.navigate(["/shoppingCart"]);
        this._ToastyService.warning({title:'Check out Products',msg:'Please check your shopping cart.',theme:'bootstrap',showClose:true,timeout:4000})
      }
    }
    
    checkout(){
      this.checkOutPrice = this._ProductsService.checkOutPrice;
    }

    CheckAuth() {
      this._AuthService.currentUser.subscribe((data) => {
        if (data == null) {
          this._ToastyService.error({title:'Sign In Validation',msg:'Please login first before buying any products.',theme:'bootstrap',showClose:true,timeout:3000})
          this._Router.navigate(["/login"]);
        }
      })
    }
    
    ngOnInit(): void {
      this.CheckAuth();
      this.checkout();
      this.validationCheckPrice();
    }
}
