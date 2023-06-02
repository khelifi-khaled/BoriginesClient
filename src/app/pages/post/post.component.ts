import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Category } from 'src/app/models/category.model';
import {takeUntil} from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoginService } from 'src/app/services/login.service';
import { Update } from 'src/app/models/update.model';
import { Picture } from 'src/app/models/picture.model';


@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends DestroyedComponent implements OnInit, OnDestroy {
  @ViewChild("fileUpload", { static: false }) fileUpload!: ElementRef ;


  fg!: FormGroup;
  categories: Category[] = [];
  articleSelected: Update|null = null;
  picturesToDelete : string [] = [] ; 
  picturesUploadedForCancel : string [] = [];
  selectedPhotos: File[] = [];
  //prop to detect what we are doing , if is update true otherwise false
  isUpdate : boolean = false;
  idArticleInserted : number | null = null;


  dialogMSG: string = "<h5>Your article isn't finished.</h5</br><p>Are you sure you want to leave?</p>";

  //get
  get ArticleSelected(): Update|null {
    return JSON.parse(localStorage.getItem("articleSelected")!) ?? null;
  }

  setArticleSelected (UpdatedArt : Update) {
    localStorage.setItem("articleSelected", JSON.stringify(UpdatedArt));
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
    if(this.ArticleSelected){
      this.isUpdate = true ;
    }
    this.categories = this._route.snapshot.data['category'];
    
    this._articleService.articleSelected$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(article => {
        this.articleSelected = article;

        this.fg = this._formBuilder.group({
          category_id: [null, [Validators.required]],
          titel_fr: [null, [Validators.required]],
          titel_en: [null, [Validators.required]],
          titel_nl: [null, [Validators.required]],
          content_fr: [null, [Validators.required]],
          content_en: [null, [Validators.required]],
          content_nl: [null, [Validators.required]],
        });
         
      });

      //for add article 
         if (!this.articleSelected){
          
          return ;
        }
   
        
        this.fg = this._formBuilder.group({
          category_id: [this.ArticleSelected?.idCategory, [Validators.required]],
          titel_fr: [this.ArticleSelected?.titleFr, [Validators.required]],
          titel_en: [this.ArticleSelected?.titleEn, [Validators.required]],
          titel_nl: [this.ArticleSelected?.titleFr, [Validators.required]],
          content_fr: [this.ArticleSelected?.contentFr, [Validators.required]],
          content_en: [this.ArticleSelected?.contentEn, [Validators.required]],
          content_nl: [this.ArticleSelected?.contentNl, [Validators.required]],
        });

  }

  //function to get selectedPhotos to add to my art 
  handleFileInput(event: any) {
    this.selectedPhotos = event.target.files;
  }
  async uploadPhotos(id: number) {
    if (this.selectedPhotos.length > 0) {
      for (let i = 0; i < this.selectedPhotos.length; i++) {
        try {
          const response: any = await this._articleService.uploadpic(id, this.selectedPhotos[i]).toPromise();
          const pic = {
            id: 0,
            name_picture: response.imageUrl
          };
          this.articleSelected?.pictures.push(pic);
          const picName = pic.name_picture.split('/')[4];
          this.picturesUploadedForCancel.push(picName);
        } catch (error) {
          console.error('Error uploading photo:', error);
        }
      }
    }
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
      next: async (data) => {
        this.idArticleInserted = data.idArticleInserted;
        this.fg.reset();
       //call this photo to uploade all pics on server
       await this.uploadPhotos(this.idArticleInserted || 0);
      }
    }); 

     
     
  }

  updateArticle(){
    if(this.fg.invalid){
      return;
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

    
    //update art infos 
    this._articleService.updateArticle(articleToUpdate).subscribe({
      next: ( msg ) => {
        this._toaster.success(msg.message);
        this.fg.reset();
      }
    });

    //if i have  photo deleted 
    if(this.picturesToDelete.length) {
      this.picturesToDelete.forEach(pic => {
        this._articleService.deletePic(this.articleSelected!.id,pic).subscribe({
          next : (msg : any) => {
            this._toaster.success(msg.message);
          }
        });
      });
    }//end if 
  }

  returnMain(){
    if(this.fg.touched || this.fg.dirty){
      const dialogRef = this._dialogService.open(ConfirmDialogComponent, {
        context: { message: this.dialogMSG }
      });
      dialogRef.onClose.subscribe(reponse => {
        if(reponse){
          //in this case if user has uploaded pics and he wan to cancel update art 
          if(this.picturesUploadedForCancel.length > 0 ) {
            this.picturesUploadedForCancel.forEach(pic => {
              this._articleService.deletePic(this.articleSelected!.id,pic).subscribe({
                next : (msg : any) => {
                  this._toaster.success(msg.message);
                }
              });
            });
          }
          this._router.navigate(['']);
        }
      });
    } else {
      //in this case if user has uploaded pics and he wan to cancel update art 
      if(this.picturesUploadedForCancel.length > 0 ) {
        this.picturesUploadedForCancel.forEach(pic => {
          this._articleService.deletePic(this.articleSelected!.id,pic).subscribe({
            next : (msg : any) => {
              this._toaster.success(msg.message);
            }
          });
        });
      }
      this._router.navigate(['']);
    }
  }

  selectPicToDelete(picture : Picture) {
      //removing picture from my article 
      this.articleSelected!.pictures =  this.articleSelected!.pictures.filter(p =>  p.id !== picture.id);
      //geting pic name from url 
      const picName = picture.name_picture.split('/')[4];
      this.picturesToDelete.push(picName);
      
  }

}
