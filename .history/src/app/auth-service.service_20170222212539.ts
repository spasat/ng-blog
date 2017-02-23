import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

const apiBasPath = 'http://localhost:3000/api/v1';

@Injectable()
export class AuthServiceService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public user;

  constructor(private http: Http, private autHttp: AuthHttp) {
    if (!this.user && localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
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

        sessionStorage.setItem('id_token', token);
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
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    const token: string = localStorage.getItem('id_token');
    return !!token;
  }

}
