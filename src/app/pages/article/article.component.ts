import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends DestroyedComponent implements OnInit {

  articleList: Article[] = [];
  set idCategory(value : number) {
    this.loadArticle(value)
  }
  language: string = this.getCurrentLanguage();

  constructor(
    private readonly _articleService: ArticleService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _translateService: TranslateService,
  ){
    super()
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
  }

  loadArticle(id: number) {
    this._articleService.getAll(id, this.getCurrentLanguage())

  }

  getCurrentLanguage(): string {
    return this._translateService.currentLang;
  }

}
