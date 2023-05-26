import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { takeUntil } from 'rxjs';
import { AlbumDialogComponent } from 'src/app/components/article-dialog/album-dialog/album-dialog.component';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent extends DestroyedComponent implements OnInit {
  
  albumList: Album[] = [];
  

  constructor(
    private readonly _albumService: AlbumService,
    private readonly _dialogService: NbDialogService,
  ){
    super()
  }
  
  ngOnInit(): void {
    this._albumService.albumList
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next : list => {
          this.albumList = list;
        }
      });
  }

  onClick(album: Album){
    this._albumService.SaveAlbumSelected(album);
    const dialogRef = this._dialogService.open(AlbumDialogComponent, {
      context: { 
        id : album.albumId 
      }
    });

    dialogRef.onClose.subscribe(reponse => {
      if(reponse){
        this._albumService.removeAlbumSelected();
      }
    });
  }

}
