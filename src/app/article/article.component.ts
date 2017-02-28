import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { AclService } from '../services/acl.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  slug: string;
  article;
  imageHost = environment.apiImageHost;

  constructor(
    private auth: AuthService,
    private articleService: ArticleService,
    private acl: AclService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.slug = this.activeRoute.snapshot.params['slug'];
    if (!this.article) {
      this.getArticle();
    }
  }

  private getArticle() {
    this
      .articleService
      .getArticleBySlug(this.slug)
      .subscribe(
      (data) => { this.article = data; },
      (err) => { this.router.navigate(['/404']); }
      )
      ;
  }

  isOwner() {
    return this.acl.isArticleOwner(this.article);
  }

  onDelete() {
    this.articleService
      .delete(this.article._id)
      .subscribe((res) => {
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err.json());
      });
  }

  showComments() {
    return this.auth.isLoggedIn()
      || (this.article && this.article.hasOwnProperty('comments') && this.article.comments.length);
  }

}
