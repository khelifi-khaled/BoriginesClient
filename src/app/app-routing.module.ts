import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PostComponent } from './pages/post/post.component';
import { AlbumComponent } from './pages/album/album.component';
import { UserComponent } from './pages/user/user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArticleComponent } from './pages/article/article.component';
import { CategoryResolver } from './resolvers/category.resolver';
import { PostAlbumComponent } from './pages/post-album/post-album.component';
import { PostGuard } from './guards/post.guard';
import { ManageGuard } from './guards/manage.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'main', component: MainComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'post', canActivate: [PostGuard], 
    component: PostComponent,
    resolve: { category: CategoryResolver } },
  { path: 'album', component: AlbumComponent },
  { path: 'post-album', component: PostAlbumComponent, canActivate: [PostGuard] },
  { path: 'user', component: UserComponent, canActivate: [ManageGuard]  },
  { path: 'article', component: ArticleComponent },

  
  //LAST PAGE - NOT FOUND
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
