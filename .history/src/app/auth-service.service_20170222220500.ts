import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

const apiBasPath = 'http://localhost:3000/api/v1';
const tokenKey = 'token';

@Injectable()
export class AuthServiceService {
  private jwtHelper: JwtHelper = new JwtHelper();
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public user;

  constructor(private http: Http, private autHttp: AuthHttp) {
    this.initSessionUser();
  }

  initSessionUser() {
    if (!this.user && sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
  }

  getSessionToken() {
    return sessionStorage.getItem(tokenKey);
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

        sessionStorage.setItem(tokenKey, token);
        sessionStorage.setItem('user', JSON.stringify(json.user));
        this.user = json.user;
      },
      (err) => {
        this.user = null;
      },
      () => { console.log('complete!'); }
      );
  }

  logout() {
    sessionStorage.removeItem(tokenKey);
    sessionStorage.removeItem('user');
  }

  isLoggedIn() {
    return this.jwtHelper.isTokenExpired(this.getSessionToken());
  }


}
