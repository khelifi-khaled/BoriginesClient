import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { Update } from '../models/update.model';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url: string = environment.baseApi + 'Article';
  //! url: string = environment.baseUri + 'Article';
  
  private _articleList$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  private _articleSelected$: BehaviorSubject<Update|null> = new BehaviorSubject<Update|null>(null);

  get articleList(){
    return this._articleList$.asObservable();
  }

  get articleSelected(){
    return this._articleSelected$.asObservable();
  }
  
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _router: Router,
    private readonly _translateService : TranslateService
  ) { }


  getAll(idCategory: number, language: string){
    return this._httpClient.get<Article[]>(
      this.url + '/GetAllByCategory/' + idCategory + '/' + language, 
      { reportProgress: true })
        .subscribe({
          next : (list) => {
            {
               this._articleList$.next(list);
            }
        },
        error :
         (error) => {
          this._articleList$.next([]);
         }
    });
  }

  getById(id: number){
    return this._httpClient.get<Update>(this.url + '/GetArticleByIdEdit/' + id, { reportProgress: true })
      .subscribe(article => {
        this._articleSelected$.next(article);
        localStorage.setItem("articleSelected", JSON.stringify(article));
        this._router.navigate(['/post']);
      });
  }

  getTest(id: number) : Observable<Article>{
    return this._httpClient.get<Article>(this.url + '/GetArticleById/' + id + "/" + this._translateService.currentLang, { reportProgress: true });
  }

  createArticle(article: any){
    return this._httpClient.post<any>(this.url + '/PostArticle', article, { reportProgress: true });
  }

  updateArticle(article: any){
    return this._httpClient.put<any>(this.url + '/UpdateArticle/' + article.id, article, { reportProgress: true });
  }

  
  removeArticleSelected() {
    this._articleSelected$.next(null);
    localStorage.removeItem("articleSelected");
  }

}
