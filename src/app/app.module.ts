import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { BusyModule } from 'angular2-busy';

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
import { ArticleDetailsComponent } from './article/details/details.component';
import { ArticleCommentsComponent } from './article/comments/comments.component';
import { CommentsService } from './services/comments.service';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { AboutComponent } from './about/about.component';
import { ArticleCreateComponent } from './article/create/create.component';
import { AclService } from './services/acl.service';
import { InputFileComponent } from './input-file/input-file.component';
import { ArticleEditComponent } from './article/edit/edit.component';
import { ArticleFormComponent } from './article/form/form.component';

import { DialogPasswordComponent } from './dialogs/password/password.component';
import { DialogConfirmComponent } from './dialogs/confirm/confirm.component';
import { BreadcrumbComponent } from './bredcrumb/breadcrumb.component';
import { GravatarService } from './services/gravatar.service';
import { GravatarDirective } from './directives/gravatar.directive';
import { BusyService } from './services/busy.service';

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
    ArticleDetailsComponent,
    DialogPasswordComponent,
    DialogConfirmComponent,
    ArticleCommentsComponent,
    SideNavigationComponent,
    AboutComponent,
    ArticleCreateComponent,
    InputFileComponent,
    ArticleEditComponent,
    ArticleFormComponent,
    BreadcrumbComponent,

    GravatarDirective,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    BusyModule
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService,
    UserService,
    ArticleService,
    CommentsService,
    IsLoggedInGuard,
    AlreadyLoggedInGuard,
    AclService,
    GravatarService,
    BusyService
  ],
  entryComponents: [
    DialogPasswordComponent,
    DialogConfirmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
