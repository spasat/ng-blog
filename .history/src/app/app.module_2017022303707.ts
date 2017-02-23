import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BlogHeaderComponent } from './blog-header/blog-header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthServiceService } from './services/auth-service.service';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogHeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    AuthServiceService,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
