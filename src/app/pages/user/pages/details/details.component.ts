import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { map, of, takeUntil, tap } from 'rxjs';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { User } from 'src/app/models/user.model';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends DestroyedComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement') inputElement!: ElementRef;

  userSelected: User|null = null;
  fg!: FormGroup;
  userList :  User[] = []; 

  //get
  get UserSelected(): User|null {
    return JSON.parse(localStorage.getItem("userSelected")! ?? null);
  }

  //set
  set UserSelected(value: User|null){
    localStorage.setItem("userSelected", JSON.stringify(value));
  }

  

  constructor(
    private readonly _userService: UserService,
    private readonly _formBuilder: FormBuilder,
    private readonly _toaster: NbToastrService,
    private readonly _translateService: TranslateService,
    private readonly _languageService: LanguageService,
  ){
    super();
    this._translateService.use(this._languageService.myLanguage);
  }

  ngOnInit(): void {

    this._userService.userDetails
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user =>  { 
        this.userSelected = user;
        
        this.fg?.patchValue({
          lastName : user?.last_name,
          firstName : user?.first_name,
          email : user?.login
        });
      });

    this.fg = this._formBuilder.group({
      lastName: [null, [Validators.required, Validators.maxLength(50),]],
      firstName: [null, [Validators.required, Validators.maxLength(50),]],
      email: [null, 
        [Validators.required,
        Validators.maxLength(250),
        Validators.email,
        Validators.pattern(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z].{1,}$/),
        
      ]

    ],
      confirmEmail: [null, [
        Validators.required,
        Validators.email, 
        this.match("email"),
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(20),
      ]],
      confirmPassword: [null, [
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(20),
        this.match("password"),
      ]],
    });

    this._userService.userList.subscribe((data) => {
      this.userList = data ;
    });
    
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._userService.removeUserSelected();
  }

  match(toMatch : string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors|null => {
        const value: string = control.value;
        
        if(!value){
            return null;
        }

        if(this.fg.controls[toMatch].value !== value && this.fg.controls[toMatch].touched){
            return { notMatching: true }
        }

        return null;
    }
  }



  emailExistsValidator() : AsyncValidatorFn | null {
    return (control : AbstractControl) => {
      console.log(control.value)
      if(!control.value) {
        return of(null)
      }
      else {
        return this._userService.checkEmail(control.value)
        .pipe(
          tap((resp) => this.test = resp),
          map((response : any) => {
          return response.isEmailExist ? {emailExistsValidator : true} : null
        }))
      }
    }
    
  }
    test! :any
  add(){
    this.UserSelected = null;
    this.fg.reset()    
  }

  submit(){
    this.fg.markAllAsTouched();

    if(!this.UserSelected?.id){
      this.newUser();
    } else {
      this.updateUser();
    }
  }

  newUser(){
    if(this.fg.invalid){
      return;
    }

    const userToAdd = {
      id : 0,
      first_name: this.fg.get('firstName')?.value,
      last_name: this.fg.get('lastName')?.value,
      login: this.fg.get('email')?.value,
      password: this.fg.get('password')?.value,
    }

    this._userService.createUser(userToAdd).subscribe({
      next: (data) =>  {
        userToAdd.id = data.IdUserInserted;
        this._toaster.success('New user created !');
        this.fg.reset();
        this.addToList(userToAdd);
      }
    });;
  }

  updateUser(){
    if(this.fg.invalid){
      return;
    }

    const userToUpdate = {
      id: this.userSelected!.id,
      first_name: this.fg.get('firstName')?.value,
      last_name: this.fg.get('lastName')?.value,
      login: this.fg.get('email')?.value,
      password: this.fg.get('password')?.value,
    }



    this._userService.updateUser(userToUpdate).subscribe({
      next: ( _ ) => {
        this._toaster.success('User updated !');
        this.fg.reset();
        this.updateList(userToUpdate);
      }
    });
  }

  updateList(user: User){
    const index = this.userList.findIndex(toRemove => toRemove.id === user.id);
    console.log(user);
    console.log(index);
    
    

    if(index !== -1){
      this.userList.splice(index, 1);
      this.userList.splice(index, 0, user);
    }
      
  }

  addToList(user: User){
    this.userList.push(user);
    this._userService.saveList(this.userList);
  }

  preventAction(event: ClipboardEvent): void {
    event.preventDefault();
  }
  
  
}
