
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  get userConnected(){
    return this._loginService.userConnected;
  }

  constructor(
    private readonly _translateService: TranslateService,
    private readonly _loginService: LoginService,
    private readonly _router: Router,
  ){}

  navigate(idCategory: number){
    this._router.navigate(['/article'], {
      queryParams: { id: idCategory }
    });
  }

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
    this._loginService.logout();
  }
}