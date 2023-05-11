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
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PostComponent } from './pages/post/post.component';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponent,
    FormErrorsComponent,
    LoginComponent,
    ContactComponent,
    PostComponent
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
    NbButtonModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
