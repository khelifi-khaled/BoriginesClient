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

  private _userList$: BehaviorSubject<UserList[]> = new BehaviorSubject<UserList[]>([]);
  private _userDetails$: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  get userList(){
    return this._userList$.asObservable();
  }

  get userDetails(){
    return this._userDetails$.asObservable();
  }

  constructor(
    private readonly _httpClient: HttpClient,
  ) { 
    this.getAll();
  }

  getAll(){
    return this._httpClient.get<UserList[]>(this.url + 'List', { reportProgress: true }).subscribe(list => {
      this._userList$.next(list);
    });
  }

  get(id: number){
    return this._httpClient.get<User>(this.url + '/' + id, { reportProgress: true }).subscribe(user => {
      this._userDetails$.next(user);
    })
  }


}
