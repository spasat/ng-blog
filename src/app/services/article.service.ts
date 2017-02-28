import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';

@Injectable()
export class ArticleService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(
    private http: Http,
    private authHttp: AuthHttp
  ) { }

  getArticles(limit, offset = 0) {
    const url = `${environment.apiBaseUrl}/articles`;
    const query = `limit=${limit}&skip=${offset}`;
    return this.http
      .get(url, { search: query, headers: this.headers })
      .map((res) => res.json())
      ;
  }

  getArticleBySlug(slug: string) {
    const url = `${environment.apiBaseUrl}/articles/${slug}`;

    return this.http
      .get(url, { headers: this.headers })
      .map(res => res.json())
      ;
  }

  getArticle(articleId: string) {
    const url = `${environment.apiBaseUrl}/articles/${articleId}`;

    return this.http
      .get(url, { headers: this.headers })
      .map(res => res.json())
      ;
  }

  create(data: FormData) {
    const url = `${environment.apiBaseUrl}/articles`;
    return this.authHttp
      .post(url, data)
      .map(res => res.json());
  }

  delete(articleId) {
    const url = `${environment.apiBaseUrl}/articles/${articleId}`;
    return this.authHttp
      .delete(url, { headers: this.headers })
      .map(res => res.json());
  }

  update(articleId, data: FormData) {
    const url = `${environment.apiBaseUrl}/articles/${articleId}`;
    return this.authHttp
      .put(url, data)
      .map(res => res.json());
  }

}
