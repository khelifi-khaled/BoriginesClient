import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url: string = environment.baseApi + 'Article';
  //! url: string = environment.baseUri + 'Article';
  
  private _articleList$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  private _articleSelected$: BehaviorSubject<Post|null> = new BehaviorSubject<Post|null>(null);

  get articleList(){
    return this._articleList$.asObservable();
  }

  get articleSelected(){
    return this._articleSelected$.asObservable();
  }
  
  constructor(
    private readonly _httpClient: HttpClient,
  ) { }


  getAll(idCategory: number, language: string){
    // // const credentials = { idCategory: idCategory };
    return this._httpClient.get<Article[]>(
      this.url + '/GetAllByCategory/' + idCategory + '/' + language, 
      { reportProgress: true })
        .subscribe(list => {
          this._articleList$.next(list);
     
    });
  }

  getById(id: number){
    return this._httpClient.get<Post>(this.url + '/GetArticleByIdEdit/' + id, { reportProgress: true })
      .subscribe(article => {
        this._articleSelected$.next(article);
      });
  }

  createArticle(article: any){
    return this._httpClient.post<any>(this.url + '/PostArticle', article, { reportProgress: true });
  }

  updateArticle(article: any){
    return this._httpClient.put<any>(this.url + '/UpdateArticle/' + article.id, article, { reportProgress: true });
  }

  toPost(article: Post){
    this._articleSelected$.next(article);
    localStorage.setItem("articleSelected", JSON.stringify(article));
  }


}
