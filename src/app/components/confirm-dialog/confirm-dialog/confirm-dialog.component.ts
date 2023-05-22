import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input()
  message!: string;

  constructor(
    private readonly dialogRef: NbDialogRef<boolean>
  ){}

  yes(){
    this.dialogRef.close(true);
  }

  no(){
    this.dialogRef.close(false);
  }

}
