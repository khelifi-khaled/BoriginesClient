import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends DestroyedComponent implements OnInit {
  user: User|null = null;

  constructor(
    private readonly _userService: UserService,
  ){
    super();
  }

  ngOnInit(): void {
    this._userService.userDetails
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user => this.user = user)
  }
}
