import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PostComponent } from './pages/post/post.component';
import { AlbumComponent } from './pages/album/album.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'post', component: PostComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'user', component: UserComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }