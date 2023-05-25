import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { User } from 'src/app/models/user.model';
import { LanguageService } from 'src/app/services/language.service';
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
    private readonly _translateService: TranslateService,
    private readonly _languageService: LanguageService,
  ){
    super()
    this._translateService.use(this._languageService.myLanguage);
  }

  ngOnInit(): void {
    this._userService.userList
      .pipe(takeUntil(this.destroyed$))
      .subscribe(list => {
        this.userList = list;
      });
  }

  onClick(user: User){
    this._userService.toDetails(user);
  }


}
