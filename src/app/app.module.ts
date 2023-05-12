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
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbListModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PostComponent } from './pages/post/post.component';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService } from "@syncfusion/ej2-angular-richtexteditor";
// import { QuillModule } from "ngx-quill";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlbumComponent } from './pages/album/album.component';
import { UserComponent } from './pages/user/user.component';
import { ListComponent } from './pages/user/pages/list/list.component';
import { DetailsComponent } from './pages/user/pages/details/details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    NotFoundComponent
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
    // QuillModule.forRoot(),
    RichTextEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbListModule,
    NbInputModule,
    NbEvaIconsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http:HttpClient) => {return new TranslateHttpLoader(http, './assets/i18n/', '.json');},
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
