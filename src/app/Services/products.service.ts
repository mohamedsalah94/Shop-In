import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducts, ProductsRate } from '../Interfaces/Iproducts';
import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = environment.baseUrl
  CurrentProducts:BehaviorSubject<any> = new BehaviorSubject(null);
  CurrentFavouriteProducts:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _HttpClient: HttpClient,
    private _ToastyService:ToastyService
    ){
    this.getCurrentProducts("Products");
    this.getCurrentProducts("FavouriteProducts");
  }

  AddProduct(data,formData:FormData): Observable<any> {
    let params = new HttpParams();
    params = params.append('Name', data.Name);
    params = params.append('Describtion', data.Describtion);
    params = params.append('Category', data.Category);
    params = params.append('Price', data.Price);
    params = params.append('OnSale', data.OnSale);
    params = params.append('OutOfStock', data.OutOfStock);
    params = params.append('NewItem', data.NewItem);
    params = params.append('Discount', data.Discount);
    return this._HttpClient.post(`${this.baseUrl}/Products/AddProduct`,formData, { params });
  }

  UpdateProduct(data,formData:FormData): Observable<any> {
    let params = new HttpParams();
    params = params.append('Id', data.Id);
    params = params.append('Name', data.Name);
    params = params.append('Describtion', data.Describtion);
    params = params.append('Category', data.Category);
    params = params.append('Price', data.Price);
    params = params.append('OnSale', data.OnSale);
    params = params.append('OutOfStock', data.OutOfStock);
    params = params.append('NewItem', data.NewItem);
    params = params.append('Discount', data.Discount);
    return this._HttpClient.put(`${this.baseUrl}/Products/UpdateProduct`,formData, { params });
  }

  AddProductRate(data:ProductsRate){
    this._ToastyService.success({title:'Rating Products',msg:'Thank you for rating this product',theme:'bootstrap',showClose:true,timeout:2000})
    return this._HttpClient.post(`${this.baseUrl}/Products/AddProductRate`,data);
  }

  getNewProducts(NumberOfProducts:Number = 10): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Products/getNewProducts?NumberOfProducts=${NumberOfProducts}`);
  }

  getProductsOnSale(NumberOfProducts:Number = 10): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Products/getProductsOnSale?NumberOfProducts=${NumberOfProducts}`);
  }

  getProductsByCategory(Category:string,NumberOfProducts:Number = 10): Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/Products/getProductsByCategory?Category=${Category}&NumberOfProducts=${NumberOfProducts}`);
  }

  getProductsById(id:number,NumberOfProducts:Number = 10): Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/Products/getProductsById?id=${id}&NumberOfProducts=${NumberOfProducts}`);
  }

  getCurrentProducts(Products){
    if (Products == "Products") {
      if (JSON.parse(localStorage.getItem(Products)) != null) {
        this.CurrentProducts.next(JSON.parse(localStorage.getItem(Products)));
      }else{
        this.CurrentProducts.next(null);
      }
    } else {
      if (JSON.parse(localStorage.getItem(Products)) != null) {
        this.CurrentFavouriteProducts.next(JSON.parse(localStorage.getItem(Products)));
      }else{
        this.CurrentFavouriteProducts.next(null);
      }
    }
  }

  addToCart(item:IProducts , key:string ='Products'){
    let Products = this.getProductsFromLocalStorage(key);
    for (let i = 0 ; i < Products.length; i++)
    {
      if(Products[i].id == item.id && key == 'Products'){
        this._ToastyService.error({title:'Error',msg:'This item is already in the shopping cart.',theme:'bootstrap',showClose:true,timeout:4000})
        return
      }else if(Products[i].id == item.id && key == 'FavouriteProducts'){
        this._ToastyService.error({title:'Error',msg:'This item is already in the WishList.',theme:'bootstrap',showClose:true,timeout:4000})
        return
      }
    }
    if(item.outOfStock == true && key == 'Products'){
      this._ToastyService.error({title:'Error',msg:'This item is out of stock.',theme:'bootstrap',showClose:true,timeout:4000})
      return
    }
    Products.push(item);
    localStorage.setItem(key,JSON.stringify(Products));
    this.getCurrentProducts(key);
  }

  addToFavourite(item){
    this.addToCart(item,"FavouriteProducts");
  }

  getProductsFromLocalStorage(key){
    let Products:[];
    if (JSON.parse(localStorage.getItem(key)) == null) {
      return Products=[];
    } else {
      return Products = JSON.parse(localStorage.getItem(key));
    }
  }

  removeProductsFromLocalStorage(key:string,item:IProducts){
    let Products = this.getProductsFromLocalStorage(key);
    let index:any;
    for (let i = 0; i < Products.length; i++) {
      if (Products[i]?.id == item.id) {
          index = Products.indexOf(Products[i])
      }
    }
    Products.splice(index, 1);
    if (Products.length == 0) {
      localStorage.removeItem(key);
    }
    else{
      localStorage.setItem(key,JSON.stringify(Products));
    }
    this.getCurrentProducts(key);
  }

  getAllProducts(pageNumber:Number = 1,pageSize:Number = 5): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Products/getAllProducts?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  checkOutPrice:number = null;
  checkout(price:number){
    this.checkOutPrice = price;
  }

  deleteProducts(item:IProducts): Observable<any> {
    this.removeProductsFromLocalStorage("Products",item)
    this.removeProductsFromLocalStorage("FavouriteProducts",item)
    return this._HttpClient.delete(`${this.baseUrl}/Products/DeleteProduct?id=${item.id}`);
  }
}
