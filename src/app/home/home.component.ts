import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles = [];
  total: number;
  perPage = 3;
  page = 1;
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    if (!this.articles.length) {
      this.getArticles();
    }
  }

  getArticles() {
    const skip = (this.page - 1) * this.perPage;
    this.articleService
      .getArticles(this.perPage, skip)
      .subscribe(
      (data) => {
        this.articles = data.articles;
        this.total = <number>data.count;
      },
      (err) => { }
      );
  }

  setPage(page: number) {
    if (page > 0 && page <= this.getPages()) {
      this.page = page;
      console.log('blah');
      this.getArticles();
    }
  }

  getPages(): number {
    return Math.ceil(this.total / this.perPage);
  }

  getPagesArr() {
    return Array(this.getPages()).fill(1).map((v, i) => { return i + 1; });
  }

}
