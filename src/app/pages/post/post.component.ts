import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Category } from 'src/app/models/category.model';
import { takeUntil } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoginService } from 'src/app/services/login.service';
import { Update } from 'src/app/models/update.model';


@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends DestroyedComponent implements OnInit, OnDestroy {

  fg!: FormGroup;
  categories: Category[] = [];
  articleSelected: Update|null = null;

  dialogMSG: string = "<h5>Your article isn't finished.</h5</br><p>Are you sure you want to leave?</p>";

  //get
  get ArticleSelected(): Update|null {
    return JSON.parse(localStorage.getItem("articleSelected")! ?? null);
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
    private readonly _dialogService: NbDialogService,
  ){
    super();
    this._translateService.use(this._languageService.myLanguage);
  }

  ngOnInit(): void {
    this.categories = this._route.snapshot.data['category'];

    this._articleService.articleSelected
      .pipe(takeUntil(this.destroyed$))
      .subscribe(article => {
        this.articleSelected = article;
        console.log(this.articleSelected);
        
        this.fg = this._formBuilder.group({
          category_id: [null, [Validators.required]],
          titel_fr: [null, [Validators.required]],
          titel_en: [null, [Validators.required]],
          titel_nl: [null, [Validators.required]],
          content_fr: [null, [Validators.required]],
          content_en: [null, [Validators.required]],
          content_nl: [null, [Validators.required]],
        });

        this.fg?.patchValue({
          category_id: article?.idCategory,
          titel_fr: article?.titleFr,
          titel_en: article?.titleEn,
          titel_nl: article?.titleNl,
          content_fr: article?.contentFr,
          content_en: article?.contentEn,
          content_nl: article?.contentNl,
        });
      });

  }

  

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._articleService.removeArticleSelected();
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
    if(this.fg.invalid){
      this._toaster.danger("Failed posting new article");
      return;
    }

    const articleToAdd = {
      id: 0,
      category_id: this.fg.get('category_id')?.value,
      user_id: this._loginService.userConnected.id,
      titel_fr: this.fg.get('titel_fr')?.value,
      titel_en: this.fg.get('titel_en')?.value,
      titel_nl: this.fg.get('titel_nl')?.value,
      content_fr: this.fg.get('content_fr')?.value,
      content_en: this.fg.get('content_en')?.value,
      content_nl: this.fg.get('content_nl')?.value,
    }

    this._articleService.createArticle(articleToAdd).subscribe({
      next: (data) => {
        articleToAdd.id = data.idArticleInserted;
        this._toaster.success('New article posted !');
        this.fg.reset();
      },
      error: (data) => {
        this._toaster.danger(data.message);
      }
    })
  }

  updateArticle(){
    if(this.fg.invalid){
      this._toaster.danger("Failed updating article");
    }

    const articleToUpdate = {
      id: this.articleSelected!.id,
      category_id: this.fg.get('category_id')?.value,
      user_id: this._loginService.userConnected.id,
      titel_fr: this.fg.get('titel_fr')?.value,
      titel_en: this.fg.get('titel_en')?.value,
      titel_nl: this.fg.get('titel_nl')?.value,
      content_fr: this.fg.get('content_fr')?.value,
      content_en: this.fg.get('content_en')?.value,
      content_nl: this.fg.get('content_nl')?.value,
    }

    this._articleService.updateArticle(articleToUpdate).subscribe({
      next: ( _ ) => {
        this._toaster.success('Article updated !');
        this.fg.reset();
      },
      error: (data) => {
        this._toaster.danger(data.message);
      }
    });
  }

  returnMain(){
    if(this.fg.touched || this.fg.dirty){
      const dialogRef = this._dialogService.open(ConfirmDialogComponent, {
        context: { message: this.dialogMSG }
      });
      dialogRef.onClose.subscribe(reponse => {
        if(reponse){
          this._router.navigate(['']);
        }
      });
    } else {
      this._router.navigate(['']);
    }
  }


}
