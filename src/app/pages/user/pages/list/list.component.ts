import { Component, OnInit} from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { UserList } from 'src/app/models/user.list.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends DestroyedComponent implements OnInit {

  userList: UserList[] = [];

  constructor(
    private readonly _userService: UserService,
  ){
    super()
  }

  ngOnInit(): void {
    this._userService.userList
      .pipe(takeUntil(this.destroyed$))
      .subscribe(list => {
        console.log(list)
        this.userList = list;
      })
  }

  onClick(id: number){
    this._userService.get(id);
  }


}
