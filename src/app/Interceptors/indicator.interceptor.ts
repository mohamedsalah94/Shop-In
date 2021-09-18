import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndicatorService } from '../Services/indicator.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class IndicatorInterceptor implements HttpInterceptor {

  constructor(private indicatorService:IndicatorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.indicatorService.busy();
    return next.handle(request).pipe(
      finalize(()=>{
        this.indicatorService.idle();
      })
    );
  }
}
