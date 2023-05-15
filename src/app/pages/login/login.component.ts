import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LoginService } from 'src/app/services/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fg!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _loginService: LoginService,
    private readonly _toaster: NbToastrService,
    private readonly _router: Router,
  ){}

  ngOnInit(): void {
    this.fg = this._formBuilder.group({
      email: [null, [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z].{1,}$/),
      ]],
      password: [null, [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(20),
      ]],
    });
  }

  submit(){
    if(this.fg.invalid){
      this._toaster.warning('Echec login');
      return;
    }
    this._loginService.getUser(this.fg.get('email')?.value, this.fg.get('password')?.value);
  }

}
