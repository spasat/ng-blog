import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { AclService } from '../services/acl.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  _id: string;
  article;

  constructor(
    private auth: AuthService,
    private acl: AclService,
    private articleService: ArticleService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this._id = this.activeRoute.snapshot.params['articleId'];
    this.getArticle();
    this.buildForm();
  }

  private getArticle() {
    this
      .articleService
      .getArticle(this._id)
      .subscribe(
      (data) => {
        this.article = data;
        this.checkPermissions();
      },
      (err) => {
        this.router.navigate(['/404']);
      }
      )
      ;
  }

  private checkPermissions() {
    if (!this.acl.isArticleOwner(this.article)) {
      this.router.navigate(['/']);
    }
  }

  buildForm() {
    this.fb.group({

    });
  }



}
