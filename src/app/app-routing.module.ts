import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlreadyLoggedInGuard } from './guards/already-logged-in.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { LoginComponent } from './login/login.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccountComponent } from './account/account.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: 'login', component: LoginComponent, data: { title: 'Login' }, canActivate: [IsLoggedInGuard] },
    { path: 'singin', component: SingInComponent, data: { title: 'Sing In' }, canActivate: [IsLoggedInGuard] },
    { path: 'account', component: AccountComponent, data: { title: 'Account' }, canActivate: [AlreadyLoggedInGuard] },
    {
        path: 'articles/create',
        component: ArticleCreateComponent,
        data: { title: 'Article Creation' },
        canActivate: [AlreadyLoggedInGuard]
    },
    { path: 'articles/:slug', component: ArticleComponent },
    { path: 'articles/:articleId/edit', component: ArticleEditComponent, canActivate: [AlreadyLoggedInGuard] },

    { path: '404', component: NotFoundComponent, data: { title: 'Not found!' } },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
