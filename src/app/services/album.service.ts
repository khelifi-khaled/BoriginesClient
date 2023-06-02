import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    
   }

  getAll(){
    return this._httpClient.get<Album[]>(
      this.url + '/GetAllAlbums',
      { reportProgress: true });
  }

  postAlbum(album: any){
    return this._httpClient.post<any>(this.url + '/PostAlbum', album, { reportProgress: true });
  }

  deletePic(id : number ,picsName : string ) {
    const body = { name_picture: picsName };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
    });
    const options = {
      headers: headers,
      body: body,
    };
    return this._httpClient.delete(this.url+ '/DeletePicture/'+ id ,options);
    
  }


   uploadpic(id : number , file : File) {
    const formData = new FormData();
    formData.append('PhotoFile', file);
    return this._httpClient.post(this.url+ '/PostPicture/'+ id ,formData) ;
  }


  removeAlbumSelected(){
    this._albumSelected$.next(null);
    localStorage.removeItem("albumSelected");
  }


  SaveAlbumSelected (album : Album) {
    localStorage.setItem("albumSelected", JSON.stringify(album));
    this._albumSelected$.next(album);
  }

  addAlbumToMainList (album  : Album []) {
    this._albumList$.next(album);
  }


}
