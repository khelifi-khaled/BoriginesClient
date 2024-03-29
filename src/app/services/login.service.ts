import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token!: string;
  _isConnectedSubject$: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(this.userConnected);
  _isValidToken$: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(this.validToken);

  get userConnected(){
    //? return localStorage.getItem('userConnected') ? JSON.parse(localStorage.getItem('userConnected')!) : null;
    return JSON.parse(localStorage.getItem('userConnected') || 'null');
  }

  get validToken(){
    //? return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null;
    return JSON.parse(localStorage.getItem('token') || 'null');
  }

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _router: Router,
    private readonly _translateService: TranslateService,
  ) { }

  getUser(login: string, password: string){
    const credentials = { login: login, password: password };
    return this._httpClient.post<any>(environment.baseApi + 'User/Login', credentials,
    { reportProgress: true }).subscribe({
      next : (user) => {
            localStorage.setItem('userConnected', JSON.stringify(user));
            this._isConnectedSubject$.next(this.userConnected);
            this.getToken(login, password);
            this._router.navigate(['main']);
      }
    });
  }

  getToken(login: string, password: string){
    const credentials = { login: login, password: password };
    return this._httpClient.post(environment.baseApi + 'User/Token', credentials, 
    { reportProgress: true, responseType: "text" }).subscribe({
      next: token => {
        if(token){
          this.token = token;
          localStorage.setItem('token', JSON.stringify(token));
          this._isValidToken$.next(this.validToken);
        }
      }
    });
  }

  isAuthenticated(){
    return localStorage.getItem("userConnected") !== null;
  }

  isAdmin(){
    const admin = JSON.parse(localStorage.getItem('userConnected') || 'null');
    if(admin !== null)
      if(admin.isAdmin)
        return true;

    return false;
  }

  logout (){
    localStorage.clear();
    localStorage.setItem('myLanguage', JSON.stringify(this._translateService.currentLang));
    this._router.navigate(['main']);
  }

}
