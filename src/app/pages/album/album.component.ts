import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent extends DestroyedComponent implements OnInit {
  
  albumList: Album[] = [];
  showAlbum: boolean = false;

  responsiveOptions: any[] = [
    {
        breakpoint: '1500px',
        numVisible: 5
    },
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  constructor(
    private readonly _albumService: AlbumService,
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


}
