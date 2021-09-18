import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  busyRequestCount = 0;
  constructor(private spinnerService:NgxSpinnerService) { }

  busy(){
    this.busyRequestCount++;
    this.spinnerService.show(undefined)
  }

  idle(){
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
      $("html,body").css({overflow : "visible"})
    }
  }
}
