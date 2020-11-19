import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (function ($) {
      "use strict";
       
    
        
      $(document).ready(function(){
        $("#prod-list").click(function(){
          $("#product-list").show();
          $("#product-group").hide();
          $('#prod-list').css({'box-shadow':"none",'outline':"0"});
          $('#prod-group').css({'box-shadow':"none",'outline':"0"});
        });
      });
    
      $(document).ready(function(){
        $("#prod-group").click(function(){
          $("#product-group").show();
          $("#product-list").hide();
          $('#prod-list').css({'box-shadow':"none",'outline':"0"});
          $('#prod-group').css({'box-shadow':"none",'outline':"0"});

 

        });
      });

    
    })($); 
  }

}
