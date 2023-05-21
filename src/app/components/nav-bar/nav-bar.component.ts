
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
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

  // test  : any | null = null ; 
  // isMenuOpen: boolean = false;

  constructor(
    private readonly _translateService: TranslateService,
    private readonly _languageService : LanguageService,
    private readonly _loginService: LoginService,
    private readonly _router: Router,
  ){}

  navigate(idCategory: number){
    this._router.navigate(['/article'], {
      queryParams: { id: idCategory }
    });
    this.closeMenu();
  }

  changeLanguage(lang: string){
    this._translateService.use(lang);
   this._languageService.ChangeLanguage();
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
    this.closeMenu;
  }

  closeMenu() {
    const toggleMenuCheckbox = document.getElementById('toggle-menu') as HTMLInputElement;
    if (toggleMenuCheckbox) {
      toggleMenuCheckbox.checked = false;
    }
  }
}