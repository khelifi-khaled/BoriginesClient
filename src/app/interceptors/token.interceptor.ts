import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly _loginService: LoginService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this._loginService.validToken){
            
      let clone = request.clone({ setHeaders: { "Authorization" : "bearer "+ this._loginService.validToken }});
      return next.handle(clone);
    }
    
    return next.handle(request);
  }
}
