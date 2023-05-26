import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { BehaviorSubject } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  url: string = environment.baseApi + 'Album';

  private _albumList$: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);

  private _albumSelected$: BehaviorSubject<Album|null> = new BehaviorSubject<Album|null>(null);


  
  get albumList(){
    return this._albumList$.asObservable();
  }

  get albumSelected$(){
    return this._albumSelected$.asObservable();
  }

  constructor(
    private readonly _httpClient: HttpClient,
  ) {
    this.getAll();
   }

  getAll(){
    return this._httpClient.get<Album[]>(
      this.url + '/GetAllAlbums',
      { reportProgress: true })
        .subscribe({
          next: (list) => {
            this._albumList$.next(list);
            console.log(list);
            
          },
          error: (error) => {
            this._albumList$.next([]);
          }
        });
  }

  postAlbum(){

  }

  postPicture(id: number){

  }

  putAlbum(id: number){

  }

  deleteAlbum(id: number){

  }

  deletePicture(id: number){

  }

  removeAlbumSelected(){
    this._albumSelected$.next(null);
    localStorage.removeItem("albumSelected");
  }


  SaveAlbumSelected (album : Album) {
    localStorage.setItem("albumSelected", JSON.stringify(album));
    this._albumSelected$.next(album);
  }


}
