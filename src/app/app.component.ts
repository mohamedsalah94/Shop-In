import { Component } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private wowService: NgwWowService) {
    this.wowService.init();
    $('body').removeClass("mat-typography")
  }
  title = 'Shop-In';

}
