import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly _toaster: NbToastrService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(xhr => {
      
      switch (xhr.status){
        case 400: 
          this._toaster.danger(xhr.error.message);  
        break;
        case 401:
          this._toaster.danger('You are not authorized to do this operation');
          break;
        case 403:
          this._toaster.danger('You are not allowed to do this operation');
          break;
        case 404: 
          this._toaster.danger(xhr.error.message);
          break;
        case 500:
          this._toaster.danger('You have error server, you need to contact technical support please');
          break;
        default:
          this._toaster.danger('Something went wrong...');
          break;
      };
      
      throw new Error(xhr);
    }));
  }
}
