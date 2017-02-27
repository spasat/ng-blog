import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment.prod';
import { Headers } from '@angular/http';

@Injectable()
export class CommentsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private authHttp: AuthHttp) { }

  add(articleId, data) {
    const url = `${environment.apiBaseUrl}/articles/${articleId}/comments`;
    return this.authHttp
      .post(url, data, { headers: this.headers })
      .map(res => res.json())
      ;
  }

}
