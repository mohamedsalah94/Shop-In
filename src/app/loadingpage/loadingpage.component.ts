import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-loadingpage',
  templateUrl: './loadingpage.component.html',
  styleUrls: ['./loadingpage.component.scss']
})
export class LoadingpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
        $(document).ready(function(){
      $(".forloading").fadeOut( 2000, onload , function(){
      $("html,body").css({overflow : "auto"})
      });
    });
  }

}
