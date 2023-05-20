import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends DestroyedComponent implements OnInit {

  articleList: Article[] = [];
  _idCategory!: number
  set idCategory(value : number) {
    this._idCategory = value
    this.loadArticle()
  }
  language!: string

  get userConnected(){
    return this._loginService.userConnected;
  }

  constructor(
    private readonly _articleService: ArticleService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _translateService: TranslateService,
    private readonly _loginService: LoginService,
    private readonly _languageService: LanguageService,
  ){
    super()
    this._translateService.use(this._languageService.myLanguage);
  }

  test : any | null = null ; 

  ngOnInit(): void {
    
    this._activatedRoute.queryParams.subscribe(params => {
      this.idCategory = params['id'];
    });

    this._articleService.articleList
      .pipe(takeUntil(this.destroyed$))
      .subscribe(list => {
        this.articleList = list;
        console.log(list)
      });

      this._languageService._myLanguage$.subscribe(lang => {
        this.language = lang
        this.loadArticle()
      })
      // this._translateService.onTranslationChange.subscribe(data => {
      //   this.test = data;
      //   console.log(this.test)
      // }); 
      
  }

 





  loadArticle() {
    this._articleService.getAll(this._idCategory, this.language)

  }

  getCurrentLanguage(): string {
    return this._translateService.currentLang;
  }

  show(){
    
  }

  edit(){

  }


  

}
