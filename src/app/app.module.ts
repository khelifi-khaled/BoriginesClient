import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, 
  NbIconModule, NbInputModule, NbListModule, NbToastrModule, NbDialogModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PostComponent } from './pages/post/post.component';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlbumComponent } from './pages/album/album.component';
import { UserComponent } from './pages/user/user.component';
import { ListComponent } from './pages/user/pages/list/list.component';
import { DetailsComponent } from './pages/user/pages/details/details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ArticleComponent } from './pages/article/article.component';
import { GalleriaModule } from 'primeng/galleria';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { ArticleDialogComponent } from './components/article-dialog/article-dialog/article-dialog.component';
import { CarouselModule } from './modules/carousel/carousel.module';
import { AlbumDialogComponent } from './components/article-dialog/album-dialog/album-dialog.component';
import { PostAlbumComponent } from './pages/post-album/post-album.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponent,
    FormErrorsComponent,
    LoginComponent,
    ContactComponent,
    PostComponent,
    AlbumComponent,
    UserComponent,
    ListComponent,
    DetailsComponent,
    NotFoundComponent,
    LoaderComponent,
    ArticleComponent,
    ConfirmDialogComponent,
    ArticleDialogComponent,
    AlbumDialogComponent,
    PostAlbumComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    NbButtonModule,
    NbListModule,
    NbInputModule,
    NbEvaIconsModule,
    CarouselModule,
    NbSelectModule,
    GalleriaModule,
    NbDialogModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http:HttpClient) => {return new TranslateHttpLoader(http, './assets/i18n/', '.json');},
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
