import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles = [];
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    if (!this.articles.length) {
      this.articleService
        .getArticles(3)
        .subscribe(
        (data) => { this.articles = data.articles; },
        (err) => { }
        );
    }
  }


}
