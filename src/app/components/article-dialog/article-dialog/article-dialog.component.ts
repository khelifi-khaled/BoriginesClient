import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent extends DestroyedComponent implements OnInit {
  @Input() 
  id!: number

  articleSelected!: Article;

  constructor(
    private readonly dialogRef: NbDialogRef<boolean>,
    private readonly _articleService: ArticleService,
  ){
    super();
  }

  ngOnInit(): void {
        
    this._articleService.getArticle(this.id).subscribe(
      (article : Article) =>  {
      this.articleSelected = article
      console.log(article) }
    )
  };

  close(){
    this.dialogRef.close(true);
  }
}
