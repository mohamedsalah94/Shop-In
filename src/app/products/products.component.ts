import { Component, OnInit } from '@angular/core';
import { IProducts, ProductsRate } from '../Interfaces/Iproducts';
import { ProductsService } from '../Services/products.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  Products:IProducts
  CurrentParam:any;
  ProductsRate:ProductsRate;

  NoProductsAvailable:string;
  constructor(
    private _ProductsService:ProductsService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.CurrentParam = params.get('cat')
      this.getProducts(this.CurrentParam);
  })
  }

  getProducts(Category:string){
    this._ProductsService.getProductsByCategory(Category,12).subscribe(res=>{
      this.Products = res;
      if (res.length <= 0) {
        this.NoProductsAvailable = "No products were found matching your selection";
      }else{
        this.NoProductsAvailable = null;
      }
    },
    error =>{
        console.log(error.error);
      }
    )
  }

  sidebarCollapse(){
    $('#FilterSidebar').toggleClass('active');
  }

  getProductsGroup(){
    $("#product-group").show();
    $("#product-list").hide();
    $("#prod-group").addClass("activeFilter");
    $("#prod-list").removeClass("activeFilter");
  }

  getProductsList(){
    $("#product-list").show()
    $("#product-group").hide()
    $("#prod-list").addClass("activeFilter");
    $("#prod-group").removeClass("activeFilter");
  }

  setRate(i:number,ProductId:number , Rate:number){
    this.ProductsRate = new ProductsRate();
    this.ProductsRate.ProductId = ProductId;
    this.ProductsRate.Rate = Rate;
    this._ProductsService.AddProductRate(this.ProductsRate).subscribe(()=>{
      $(`#star1${i}`).prop( "disabled", true );
      $(`#star2${i}`).prop( "disabled", true );
      $(`#star3${i}`).prop( "disabled", true );
      $(`#star4${i}`).prop( "disabled", true );
      $(`#star5${i}`).prop( "disabled", true );
    });
  }

  addToCart(item){
    this._ProductsService.addToCart(item);
  }

  addToFavourite(item){
    this._ProductsService.addToFavourite(item);
  }
}
