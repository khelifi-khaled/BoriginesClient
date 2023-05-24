import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Article } from 'src/app/models/article.model';
import { Picture } from 'src/app/models/picture.model';
import { Update } from 'src/app/models/update.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent extends DestroyedComponent implements OnInit {
  @Input() id! : number
  // title!: string
  // content!: string;
  // date!: Date;
  // firstName!: string;
  // lastName!: string;
  // pictures!: Picture[];

  articleSelected!: Article;

  //get
  // get ArticleSelected(): Update|null {
  //   return JSON.parse(localStorage.getItem("article")! ?? null);
  // }

  constructor(
    private readonly dialogRef: NbDialogRef<boolean>,
    private readonly _articleService: ArticleService,
  ){
    super();
  }

  ngOnInit(): void {
    
    // this._articleService.articleSelected
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe(article => {
    //     this.articleSelected = article;
    // });
    
        this._articleService.getTest(this.id).subscribe(
         (article : Article) =>  {
          this.articleSelected = article
          console.log(article) }
        )
    //console.log('article selected');
    
    //console.log(this.ArticleSelected);
    //console.log('pictures');
    
    //console.log(this.articleSelected?.pictures);
    

  };

  close(){
    this.dialogRef.close(true);
  }
}
