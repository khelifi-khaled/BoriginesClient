import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Category } from 'src/app/models/category.model';
import { Post } from 'src/app/models/post.model';
import { ArticleService } from 'src/app/services/article.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  fg!: FormGroup;
  categories: Category[] = [];
  articleSelected: Post|null = null;

  //get
  get ArticleSelected(): Post|null {
    return JSON.parse(localStorage.getItem("articleSelected")! ?? null);
  }

  //set
  set ArticleSelected(value: Post|null){
    localStorage.setItem("articleSelected", JSON.stringify(value));
  }
  

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _translateService: TranslateService,
    private readonly _languageService: LanguageService,
    private readonly _loginService: LoginService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _toaster: NbToastrService,
    private readonly _articleService: ArticleService,
  ){
    this._translateService.use(this._languageService.myLanguage);
  }

  ngOnInit(): void {
    this.categories = this._route.snapshot.data['category'];
    
    this.fg = this._formBuilder.group({
      category_id: [null, [Validators.required]],
      user_id: [this._loginService.userConnected],
      titel_fr: [null, [Validators.required]],
      titel_en: [null, [Validators.required]],
      titel_nl: [null, [Validators.required]],
      content_fr: [null, [Validators.required]],
      content_en: [null, [Validators.required]],
      content_nl: [null, [Validators.required]],
    });

  }

  submit(){
    this.fg.markAllAsTouched();

    if(!this.ArticleSelected?.id){
      this.newArticle();
    } else {
      this.updateArticle();
    }
  }

  newArticle(){

  }

  updateArticle(){

  }


}
