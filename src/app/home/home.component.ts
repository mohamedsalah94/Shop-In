import { Component, OnInit } from '@angular/core';
import { IProducts } from '../Interfaces/Iproducts';
import {ProductsService} from '../Services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  NewProducts:[IProducts];
  ProductsOnSale:[IProducts];
  
  constructor(private _ProductsService:ProductsService) { }

  ngOnInit(): void {
    this.getNewProducts();
    this.getProductsOnSale();
  }

  getNewProducts(){
    this._ProductsService.getNewProducts(12).subscribe(res=>{
      this.NewProducts = res;
    },
    error =>{
        console.log(error.error);
      }
    )
  }

  getProductsOnSale(){
    this._ProductsService.getProductsOnSale(12).subscribe(res=>{
      this.ProductsOnSale = res
    },
    error =>{
        console.log(error.error);
      }
    )
  }

  addToCart(item){
    this._ProductsService.addToCart(item);
  }

  addToFavourite(item){
    this._ProductsService.addToFavourite(item);
  }

}


