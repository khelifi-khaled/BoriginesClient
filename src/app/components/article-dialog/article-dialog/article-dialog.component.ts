import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent {
  @Input()
  title!: string
  content!: string;
  date!: Date;
  firstName!: string;
  lastName!: string;
  // message: string = `écrit par : {{lastName}}`

  constructor(
    private readonly dialogRef: NbDialogRef<boolean>
  ){}

  close(){
    this.dialogRef.close(true);
  }
}
