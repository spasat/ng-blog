import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { UserInterface } from '../models/user.interface';
import { User } from '../models/user';

const tokenKey = environment.tokenKey;

@Injectable()
export class AuthService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private user: UserInterface;

  constructor(private http: Http) {
    this.initUserFromSession();
  }

  initUserFromSession() {
    if (!this.user && localStorage.getItem('user')) {
      try {
        const user = <UserInterface>JSON.parse(localStorage.getItem('user'));
        this.user = new User(user);
      } catch (e) {
        this.logout();
      }
    }
  }

  getSessionToken() {
    return localStorage.getItem(tokenKey);
  }

  getSessionUser(): User {
    this.initUserFromSession();
    return this.user;
  }

  setSessionToken(token) {
    localStorage.setItem(tokenKey, token);
  }

  setSessionUser(user: UserInterface) {
    localStorage.setItem('user', JSON.stringify(new User(user)));
  }

  removeSessionUser() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem('user');
    this.user = null;
  }

  login(email: string, password: string) {
    const url = `${environment.apiBaseUrl}/users/login`;
    return this.http
      .post(url, {
        email: email,
        password: password
      }, { headers: this.headers })
      .map((res) => res.json())
      .do(
      (res) => {
        this.setSessionToken(res.token);
        this.setSessionUser(res.user);
      },
      (err) => this.removeSessionUser()
      );
  }

  logout() {
    this.removeSessionUser();
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

}
