
import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(
    private readonly _translateService: TranslateService,
  ){}

  changeLanguage(lang: string){
    this._translateService.use(lang);
  }

  selectFR(){
    this.changeLanguage("fr");
    
  }

  selectNL(){
    this.changeLanguage("nl");
  }

  selectEN(){
    this.changeLanguage("en");
  }
 
  logout(){
    
  }
}