import { Component, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnDestroy {

  constructor(
    private readonly _userService: UserService,
  ){}

  ngOnDestroy(): void {
    this._userService.removeUserSelected();
  }

}
