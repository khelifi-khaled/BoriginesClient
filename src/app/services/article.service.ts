import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Update } from '../models/update.model';


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

  get articleSelected$(){
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
            this._articleList$.next(list);
        },
        error :
         (error) => {
          this._articleList$.next([]);
         }
    });
  }

  getById(id: number){
    return this._httpClient.get<Update>(this.url + '/GetArticleByIdEdit/' + id, { reportProgress: true })
      .subscribe({
        next : art => {
            this._articleSelected$.next(art);
            localStorage.setItem("articleSelected", JSON.stringify(art));
            this._router.navigate(['/post']);
        }
      });
  }

  getArticle(id: number) : Observable<Article>{
    return this._httpClient.get<Article>(this.url + '/GetArticleById/' + id + "/" + this._translateService.currentLang, { reportProgress: true })

  }

  createArticle(article: any){
    console.log(article);
    
    return this._httpClient.post<any>(this.url + '/PostArticle', article, { reportProgress: true });
  }

  updateArticle(article: any){
    return this._httpClient.put<any>(this.url + '/UpdateArticle/' + article.id, article, { reportProgress: true });
  }

 
  removeArticleSelected() {
    this._articleSelected$.next(null);
    localStorage.removeItem("articleSelected");
  }


  deletePic(id : number ,picsName : string ) {
    const body = { name_picture: picsName };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
    });
    const options = {
      headers: headers,
      body: body,
    };
    return this._httpClient.delete(this.url+ '/DeletePicture/'+ id ,options);
    
  }


   uploadpic(id : number , file : File) {
    const formData = new FormData();
    formData.append('PhotoFile', file);
    //console.log( file);
    //console.log( formData);
    return this._httpClient.post(this.url+ '/PostPicture/'+ id ,formData) ;
  }

}
