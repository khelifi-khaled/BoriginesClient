import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ArticleDialogComponent } from 'src/app/components/article-dialog/article-dialog/article-dialog.component';
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
  language!: string

  set idCategory(value : number) {
    this._idCategory = value
    this.loadArticle()
  }

  get userConnected(){
    return this._loginService.userConnected;
  }

  constructor(
    private readonly _articleService: ArticleService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _translateService: TranslateService,
    private readonly _loginService: LoginService,
    private readonly _languageService: LanguageService,
    private readonly _dialogService: NbDialogService,
  ){
    super()
    this._translateService.use(this._languageService.myLanguage);
  }


  ngOnInit(): void {
    
    this._activatedRoute.queryParams.subscribe(params => {
      this.idCategory = params['id'];
    });

    this._articleService.articleList
      .pipe(takeUntil(this.destroyed$))
      .subscribe(list => {
        this.articleList = list;
      });

      this._languageService._myLanguage$.subscribe(lang => {
        this.language = lang
        this.loadArticle()
      })
  }

  loadArticle() {
    this._articleService.getAll(this._idCategory, this.language)

  }

  getCurrentLanguage(): string {
    return this._translateService.currentLang;
  }

  show(article: Article){
    localStorage.setItem("article", JSON.stringify(article))
    const dialogRef = this._dialogService.open(ArticleDialogComponent, {
      context: { 
        id : article.id
      }
    });

    dialogRef.onClose.subscribe(reponse => {
      if(reponse){
        
      }
    });
  }

  edit(id: number){
    this._articleService.getById(id);
    
  }


  

}
