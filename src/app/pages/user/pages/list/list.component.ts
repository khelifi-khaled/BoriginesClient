import { Component, OnInit} from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends DestroyedComponent implements OnInit {

  userList: User[] = [];

  constructor(
    private readonly _userService: UserService,
  ){
    super()
  }

  ngOnInit(): void {
    this._userService.userList
      .pipe(takeUntil(this.destroyed$))
      .subscribe(list => {
        console.log('List Component :')
        console.log(list)
        this.userList = list;
      })
  }

  onClick(user: User){
    this._userService.toDetails(user);
  }


}
