import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album-dialog',
  templateUrl: './album-dialog.component.html',
  styleUrls: ['./album-dialog.component.scss']
})
export class AlbumDialogComponent extends DestroyedComponent implements OnInit {
  @Input() id!: number

  albumSelected : Album | null = null ;

  get AlbumSelected(): Album {
    return JSON.parse( localStorage.getItem("albumSelected") !  ) as Album ; 
  }

  constructor(
    private readonly dialogRef: NbDialogRef<boolean>,
    private readonly _albumService: AlbumService,
  ){
    super();
  }
  ngOnInit(): void {
    
    this._albumService.albumSelected$.subscribe({
      next : (album) => {
        this.albumSelected = album;
      }
    })
      
  }

  close(){
    this.dialogRef.close(true);
  }

}
