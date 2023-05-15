import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
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
  ){
    super();
  }

  ngOnInit(): void {

    this._userService.userDetails
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user =>  {this.userSelected = user
        this.fg?.patchValue({
          lastName : user?.last_name,
          firstName : user?.first_name,
          email : user?.login
        })
      })

    this.fg = this._formBuilder.group({
      lastName: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      confirmEmail: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
    this._userService.userList.subscribe((data) => {
      this.userList = data ;
    })
    
  }

  add(){
    this.UserSelected = null;
    this.fg.reset()
  }

  submit(){
    if(!this.UserSelected?.id){
      this.newUser();
    } else {
      this.updateUser();
    }
  }

  newUser(){
    if(this.fg.invalid){
      this._toaster.danger("Failed adding new user");
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
      next: ( _ ) =>  {
        // userToAdd.id = data.id,
        this._toaster.success('New user created !');
        this.fg.reset();
        // this.userList.push(userToAdd);
        // this._userService.saveList(this.userList);
        this.addToList(userToAdd);
      }, 
      error: (data)  => {
        this._toaster.danger(data.message);
      }
      
    });;
    
  }

  updateUser(){
    if(this.fg.invalid){
      this._toaster.danger("Failed updating user");
      return;
    }

    const userToUpdate = {
      id: this.userSelected!.id,
      first_name: this.fg.get('firstName')?.value,
      last_name: this.fg.get('lastName')?.value,
      login: this.fg.get('email')?.value,
      password: this.fg.get('password')?.value,
    }

    // console.log(userToUpdate);

    this._userService.updateUser(userToUpdate).subscribe({
      next: ( _ ) => {
        this._toaster.success('User updated !')
        this.fg.reset();
        this.updateList(userToUpdate);
        console.log(this.userList);
        
        // this.addToList(userToUpdate);
        // console.log(this.userList);
        
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
