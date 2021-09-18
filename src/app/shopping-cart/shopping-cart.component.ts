import { Component, OnInit } from '@angular/core';
import { IProducts } from '../Interfaces/Iproducts';
import { ProductsService } from '../Services/products.service';
import { ToastyService } from 'ng2-toasty';

declare var $:any;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  Products:[IProducts];
  Shipping:number = 30;
  constructor(
    private _ProductsService:ProductsService,
    private _ToastyService:ToastyService
    ) { }

  ngOnInit(): void {
    this.getCurrentItemsInCart();
  }

  getCurrentItemsInCart(){
    this._ProductsService.CurrentProducts.subscribe(res=>{
      this.Products = res;
      setTimeout(() => {
        this.countSummary();
      }, 1);
    })
  }

  deleteItem(item:IProducts){
    this._ProductsService.removeProductsFromLocalStorage("Products",item);
    this._ToastyService.warning({title:'Item Deleted',msg:'Deleted Successfully.',theme:'bootstrap',showClose:true,timeout:2000});
    setTimeout(() => {
      this.countSummary("count");
    }, 1);
  }

  increaseItem(price:number,id:number){
    let value = $('#productCount'+id).text(); 
    $('#productCount'+id).text(Number(value)+1)
    this.countPrice(price,id,value)
    this.countSummary("count")
  }

  decreaseItem(price:number,id:number){
    if ($('#productCount'+id).text() > 1) {
      let value = $('#productCount'+id).text();  
      $('#productCount'+id).text(Number(value)-1);
      this.countPrice(price,id,value,'minus');
      this.countSummary("count")
    }
  }

  countPrice(price:number,id:number,value:any, status:string = 'plus'){
    if (status == 'minus') {
      let priceValue = Number($('#countPrice'+id).text().substring(1));
      $('#countPrice'+id).text('$' + Number(((Number(priceValue.toFixed(2))) - (Number(price.toFixed(2))))).toFixed(2))
    }
    else{
      $('#countPrice'+id).text('$' + Number(((Number(value)+1) * (Number(price.toFixed(2))))).toFixed(2))
    }
  }

  Subtotal:any = 0;
  countSummary(status:string = "default"){
    if (this.Products != null) {
      for (let i = 0; i < this.Products.length; i++) {
        if (status == "default") {
          this.Subtotal += Number($('#price'+i).text().substring(1));
        }
        else if(status == "count"){
          if (i == 0) {
            this.Subtotal = 0;
          }
          this.Subtotal += (Number($('#countPrice'+i).text().substring(1)))
        }
        else{
          this._ToastyService.error({title:'Error',msg:'ERROR OCCURRED!.',theme:'bootstrap',showClose:true,timeout:4000})
          return
        }
      }
    }
  }

  checkout(price:number){
    this._ProductsService.checkout(price);
  }

}
