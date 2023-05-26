import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { DestroyedComponent } from 'src/app/core/destroyed.component';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/services/album.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  templateUrl: './post-album.component.html',
  styleUrls: ['./post-album.component.scss']
})
export class PostAlbumComponent extends DestroyedComponent implements OnInit, OnDestroy {

  fg!: FormGroup;
  dialogMSG: string = "<h5>Your album isn't finished.</h5</br><p>Are you sure you want to leave?</p>";

  constructor(
    private readonly _dialogService: NbDialogService,
    private readonly _albumService: AlbumService,
    private readonly _formBuilder: FormBuilder,
    private readonly _translateService: TranslateService,
    private readonly _languageService: LanguageService,
    private readonly _loginService: LoginService,
    private readonly _toaster: NbToastrService,
    private readonly _router: Router,
    
  ){
    super();
    this._translateService.use(this._languageService.myLanguage);
  }

  ngOnInit(): void {
    
    this.fg = this._formBuilder.group({
      userId: this._loginService.userConnected.id,
      title: [null, [Validators.required]],
    })
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._albumService.removeAlbumSelected();
  }

  submit(){
    this.fg.markAllAsTouched();
    this.newAlbum();
  }

  newAlbum(){
    if(this.fg.invalid)
      return;

    const albumToAdd = {
      id: 0,
      userId: this._loginService.userConnected.id,
      title: this.fg.get('title')?.value,
    }

    this._albumService.postAlbum(albumToAdd).subscribe({
      next : (data) => {
        albumToAdd.id = data.idAlbumInserted;
        this._toaster.success('New album posted !');
        this.fg.reset();
      }
    });
  }

  returnMain(){
    if(this.fg.touched || this.fg.dirty){
      const dialogRef = this._dialogService.open(ConfirmDialogComponent, {
        context: { message: this.dialogMSG }
      });
      dialogRef.onClose.subscribe(reponse => {
        if(reponse){
          this._router.navigate(['']);
        }
      });
    } else {
      this._router.navigate(['']);
    }
  }
}