import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

const LoginUrl = 'http://localhost:3000/api/v1/users/login';

@Injectable()
export class AuthServiceService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private user;

  constructor(private http: Http, private autHttp: AuthHttp) { }

  login() {
    this.http
      .post(LoginUrl, {
        email: 'ascripca@joli.com',
        password: 'simplepassword'
      }, { headers: this.headers })
      .subscribe(
      (res) => {
        const json: any = res.json();
        const token: string = json.token;

        localStorage.setItem('id_token', token);
        this.user = json.user;
        
      },
      (err) => { console.log(err) },
      () => { console.log('complete!') }
      )
  }

  getUsers() {
    this.autHttp.get('http://localhost:3000/api/v1/users/' + this.user._id, { headers: this.headers })
      .subscribe(
      (res) => { console.log(res.json()) },
      (err) => console.log(err),
      () => console.log('complete')
      )
  }
}
