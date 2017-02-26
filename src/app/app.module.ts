import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
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
import { AuthGuardService } from './guards/auth-guard.service';
import { AccountComponent } from './account/account.component';
import { NoAuthGuardService } from './guards/no-auth-guard.service';
import { UcfirstPipe } from './pipes/ucfirst.pipe';
import { ArticleComponent } from './article/article.component';


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
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService,
    UserService,
    ArticleService,
    AuthGuardService,
    NoAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
