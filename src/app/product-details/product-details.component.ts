import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('#plus').click(()=>{
      let value = $('#productCount').text()      
      $('#productCount').text(Number(value)+1)
    })
    $('#minus').click(()=>{
      if ($('#productCount').text() > 1) {
        let value = $('#productCount').text()      
        $('#productCount').text(Number(value)-1)
      }
    })

    $('#reviewsBtn').click(()=>{
      $('#reviewsBtn').css('box-shadow','inset 0 0 0px transparent').html(`<div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span></div>`)})


      $('#reviewsBtn').click(()=>{
        let clear = setTimeout(() => {
          $('#reviewsBtn').html("There are no more reviews.")
        }, 500);
      })
  }

}


