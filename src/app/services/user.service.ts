import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Headers, Http } from '@angular/http';
import { AuthService } from './auth.service';
import { UserInterface } from '../models/user.interface';


@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private auth: AuthService) { }

  create(user: UserInterface) {
    const url = `${environment.apiBaseUrl}/users/`;
    return this.http.post(url, user, { headers: this.headers })
      .map((res) => res.json());
  }

  getUser() {

  }

  update(id, data) {
    const url = `${environment.apiBaseUrl}/users/${id}`;
    
  }
}
