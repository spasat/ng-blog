import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

const apiBasPath = 'http://localhost:3000/api/v1';

@Injectable()
export class AuthServiceService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public user;
  public isLoggedIn: boolean;

  constructor(private http: Http, private autHttp: AuthHttp) { }

  login() {
    const url = `${apiBasPath}/user/login`;
    this.http
      .post(url, {
        email: 'ascripca@joli.com',
        password: 'simplepassword'
      }, { headers: this.headers })
      .subscribe(
      (res) => {
        const json: any = res.json();
        const token: string = json.token;

        localStorage.setItem('id_token', token);
        this.user = json.user;
        this.isLoggedIn = true;
      },
      (err) => { console.log(err); },
      () => { console.log('complete!'); }
      );
  }

}
