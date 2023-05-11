import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fg!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
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

  }
}
