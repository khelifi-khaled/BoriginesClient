import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  supportLanguages = ['fr', 'en', 'nl'];

  constructor(
    private readonly _translateService: TranslateService,
  ){
    this._translateService.addLangs(this.supportLanguages);
    this._translateService.setDefaultLang('fr');
  }

}
