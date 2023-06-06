import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ManageGuard implements CanActivate {

  constructor(
    private readonly _loginService: LoginService,
    private readonly _router: Router,
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this._loginService.isAdmin()){
        return true;

      } else {
        this._router.navigate(['main']);
        return false;
      }
  }
  
}
