import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  
  constructor(
    private readonly _languageService: LanguageService,
    private readonly _translateService: TranslateService,
  ){
    this._translateService.use(this._languageService.myLanguage);
  }

}
