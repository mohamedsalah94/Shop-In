import { Component, OnInit } from '@angular/core';
import { IProducts } from '../Interfaces/Iproducts';
import { ProductsService } from '../Services/products.service';
import { ToastyService } from 'ng2-toasty';

declare var $:any;

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  Products:[IProducts];
  constructor(
    private _ProductsService:ProductsService,
    private _ToastyService:ToastyService
    ) { }

  ngOnInit(): void {
    this.getCurrentItemsInWishlist();
  }

  getCurrentItemsInWishlist(){
    this._ProductsService.CurrentFavouriteProducts.subscribe(res=>{
      this.Products = res;
    })
  }

  deleteItem(item:IProducts){
    this._ProductsService.removeProductsFromLocalStorage("FavouriteProducts",item);
    this._ToastyService.warning({title:'Item Deleted',msg:'Deleted Successfully.',theme:'bootstrap',showClose:true,timeout:2000})
  }

  addToCart(item){
    this._ProductsService.addToCart(item)
  }
}
