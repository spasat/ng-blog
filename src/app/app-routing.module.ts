import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AccountComponent } from './account/account.component';
import { NoAuthGuardService } from './guards/no-auth-guard.service';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, data: { title: 'Login' }, canActivate: [AuthGuardService] },
    { path: 'singin', component: SingInComponent, data: { title: 'Sing In' }, canActivate: [AuthGuardService] },
    { path: 'account', component: AccountComponent, data: { title: 'Account' }, canActivate: [NoAuthGuardService] },
    { path: 'articles/:slug', component: ArticleComponent },

    { path: '404', component: NotFoundComponent, data: { title: 'Not found!' } },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
