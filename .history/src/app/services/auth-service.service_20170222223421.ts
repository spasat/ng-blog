import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import { User } from './models/user';

const apiBasPath = 'http://localhost:3000/api/v1';
const tokenKey = 'id_token';

@Injectable()
export class AuthServiceService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public user:User;

  constructor(private http: Http, private autHttp: AuthHttp) {
    this.initSessionUser();
  }

  initSessionUser() {
    if (!this.user && localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  getSessionToken() {
    return localStorage.getItem(tokenKey);
  }

  login() {
    const url = `${apiBasPath}/users/login`;
    this.http
      .post(url, {
        email: 'ascripca@joli.com',
        password: 'simplepassword'
      }, { headers: this.headers })
      .subscribe(
      (res) => {
        const json: any = res.json();
        const token: string = json.token;

        localStorage.setItem(tokenKey, token);
        localStorage.setItem('user', JSON.stringify(json.user));
        this.user = json.user;
      },
      (err) => {
        this.user = null;
      },
      () => { console.log('complete!'); }
      );
  }

  logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return tokenNotExpired();
  }


}
