import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  supportLanguages = ['fr', 'en', 'nl'];

  _myLanguage$: BehaviorSubject<string> = new BehaviorSubject<string>(this._translateService.currentLang);
  
  get myLanguage(){
    return JSON.parse(localStorage.getItem('myLanguage') || 'null');
  }

  constructor(
    private readonly _translateService: TranslateService,
  ) { 
    this._translateService.addLangs(this.supportLanguages);
    this._translateService.setDefaultLang('fr');
    localStorage.setItem('myLanguage', JSON.stringify('fr'));
    this._myLanguage$.next('fr');
   }

   ChangeLanguage(){
    this._myLanguage$.next(this._translateService.currentLang);
   localStorage.setItem('myLanguage', JSON.stringify(this._translateService.currentLang));

   }

}
