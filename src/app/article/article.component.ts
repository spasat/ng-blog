import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  slug: string;
  article;

  constructor(
    private articleService: ArticleService,
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
      .getArticle(this.slug)
      .subscribe(
      (data) => { this.article = data; },
      (err) => { this.router.navigate(['/404']); }
      )
      ;
  }

}
