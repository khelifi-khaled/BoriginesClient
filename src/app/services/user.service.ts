import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserList } from '../models/user.list.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.baseUri + '/user';

  private _userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _userSelected$: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  get userList(){
    return this._userList$.asObservable();
  }

  get userDetails(){
    return this._userSelected$.asObservable();
  }

  constructor(
    private readonly _httpClient: HttpClient,
  ) { 
    this.getAll();
  }

  getAll(){
    return this._httpClient.get<User[]>(this.url, { reportProgress: true }).subscribe(list => {
      this._userList$.next(list);
    });
  }

  toDetails(user: User){
    this._userSelected$.next(user);
  }


}
