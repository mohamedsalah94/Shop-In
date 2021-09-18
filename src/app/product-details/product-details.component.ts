import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../Interfaces/Iproducts';
import { ProductsService } from '../Services/products.service';
declare var $:any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  CurrentParam:string;
  Product:IProducts;
  constructor(
    private _ProductsService:ProductsService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
        this.CurrentParam = params.get('id')
        this.getProductDetails(Number(this.CurrentParam));
    })

  }

  getProductDetails(id:number){
    this._ProductsService.getProductsById(id).subscribe(res=>{
      this.Product = res;
    })
  }

  increaseItem(){
    let value = $('#productCount').text(); 
    $('#productCount').text(Number(value)+1)
  }

  decreaseItem(){
    if ($('#productCount').text() > 1) {
      let value = $('#productCount').text()      
      $('#productCount').text(Number(value)-1)
    }
  }

  addToCart(item){
    this._ProductsService.addToCart(item);
  }

  addToFavourite(item){
    this._ProductsService.addToFavourite(item);
  }
}


