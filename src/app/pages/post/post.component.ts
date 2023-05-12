import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  fg!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    
    this.fg = this._formBuilder.group({
      idCategory: [null, [Validators.required]],
      idUser: [null],
      idContentFr: [null],
      titleFr: [null, [Validators.required]],
      contentFr: [null, [Validators.required]],
      idContentEn: [null],
      titleEn: [null, [Validators.required]],
      contentEn: [null, [Validators.required]],
      idContentNl: [null],
      titleNl: [null, [Validators.required]],
      contentNl: [null, [Validators.required]],
      picture: [null],
      date: [new Date()],
    });

  }


}
