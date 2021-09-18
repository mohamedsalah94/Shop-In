import { Component, OnInit } from '@angular/core';
import { IProducts } from '../Interfaces/Iproducts';
import { ProductsService } from '../Services/products.service';
import {PageEvent} from '@angular/material/paginator';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Products:[IProducts];
  paginationLength:any;
  pageSize:number =5;
  pageIndex:number =1;

  constructor(
    private _ProductsService:ProductsService,
    private _ToastyService:ToastyService
    ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(pageNumber:Number = 1,pageSize:Number = 5){
    this._ProductsService.getAllProducts(pageNumber,pageSize).subscribe(res=>{
      this.Products = res.data;
      this.paginationLength = res.totalCount
    })
  }

  onPageChanged(event:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllProducts(event.pageIndex+1,event.pageSize)
  }

  DeleteProducts(item:IProducts){
    this._ProductsService.deleteProducts(item).subscribe( ()=>{
      this.getAllProducts(this.pageIndex,this.pageSize);
      this._ToastyService.success({title:'deleting Products',msg:'Item deleted successfully',theme:'bootstrap',showClose:true,timeout:2000})
    },err=>{
      this._ToastyService.error({title:'deleting Products',msg:'error occurred while deleting this item!',theme:'bootstrap',showClose:true,timeout:2000})
    });
  }
}
