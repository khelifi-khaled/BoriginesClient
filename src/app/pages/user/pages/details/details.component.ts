import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedUser: User|null = null;
  fg!: FormGroup;

  constructor(
    private readonly _userService: UserService,
    private readonly _formBuilder: FormBuilder,
  ){
    super();
  }

  ngOnInit(): void {

    this._userService.userDetails
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user => this.selectedUser = user)

    this.fg = this._formBuilder.group({
      lastName: [this.selectedUser?.lastName, [Validators.required]],
      firstName: [this.selectedUser?.firstName, [Validators.required]],
      email: [this.selectedUser?.email, [Validators.required]],
      confirmEmail: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }



}
