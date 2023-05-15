import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.baseApi + 'User';
  // url: string = environment.baseUri + 'User';


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
    console.log('test');
    
    return this._httpClient.get<User[]>(this.url, { reportProgress: true }).subscribe(list => {
      this._userList$.next(list);
      console.log('user servive :');
      console.log(list);
      
      
      
    });
  }

  createUser(user: any){
    return this._httpClient.post<any>(this.url + '/PostUser', user, { reportProgress: true});
  }

  updateUser(user: any){
    return this._httpClient.put<any>(this.url + '/PutUser', user, { reportProgress: true});
  }

  toDetails(user: User){
    this._userSelected$.next(user);
    localStorage.setItem("userSelected", JSON.stringify(user));
  }


}
