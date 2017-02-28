import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { ArticleService } from './services/article.service';
import { SortifyPipe } from './pipes/shortify.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { AlreadyLoggedInGuard } from './guards/already-logged-in.guard';
import { AccountComponent } from './account/account.component';
import { UcfirstPipe } from './pipes/ucfirst.pipe';
import { ArticleComponent } from './article/article.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { ArticleCommentsComponent } from './article-comments/article-comments.component';
import { CommentsService } from './services/comments.service';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { AboutComponent } from './about/about.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { AclService } from './services/acl.service';
import { InputFileComponent } from './input-file/input-file.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SingInComponent,
    HomeComponent,
    SortifyPipe,
    NotFoundComponent,
    AccountComponent,
    UcfirstPipe,
    ArticleComponent,
    PasswordDialogComponent,
    ArticleCommentsComponent,
    SideNavigationComponent,
    AboutComponent,
    ArticleCreateComponent,
    InputFileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService,
    UserService,
    ArticleService,
    CommentsService,
    IsLoggedInGuard,
    AlreadyLoggedInGuard,
    AclService
  ],
  entryComponents: [
    PasswordDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
