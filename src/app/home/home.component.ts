import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  breadcrumb: Array<{ title: string, url: string }> = [];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.buildBreadcrumbs();
    this.getPageParam();
  }

  buildBreadcrumbs() {
    this.breadcrumb.push({ title: 'Blog', url: '/' });
    this.breadcrumb.push({ title: 'Home', url: undefined });
  }

  getPageParam() {
    this.activatedRoute
      .queryParams
      .subscribe(
      (q) => {
        const page = Math.abs(q['page'] && q['page'] > 0 ? q['page'] : 1);
        this.page = page;
        this.getArticles();
      },
      (err) => { }
      );
  }

  getArticles() {
    const skip = (this.page - 1) * this.perPage;
    this.articleService
      .getArticles(this.perPage, skip)
      .subscribe(
      (data) => {
        this.articles = data.articles;
        this.total = <number>data.count;

        if (!this.isValidPage(this.page)) {
          this.router.navigate(['/']);
        }
      },
      (err) => { }
      );
  }

  goToPage(page: number) {
    if (this.isValidPage(page)) {
      this.router.navigate(['/'], { queryParams: { page: page } });
    }
  }

  isValidPage(page: number): boolean {
    return page > 0 && page <= this.getPages();
  }

  getPages(): number {
    return Math.ceil(this.total / this.perPage);
  }

  getPagesArr() {
    return Array(this.getPages()).fill(1).map((v, i) => { return i + 1; });
  }

}
