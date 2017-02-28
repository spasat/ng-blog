import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss'],
})
export class ArticleCreateComponent implements OnInit {
  error: string;
  success: boolean;
  createdSlug: string;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {

  }

  onFormSubmit(data: FormData) {
    this.error = '';
    this.articleService
      .create(data)
      .subscribe(
      (res) => {
        this.success = true;
        this.createdSlug = res.slug;
      },
      (err) => {
        const json = err.json();
        this.error = json.error;
      }
      );
  }

  onCreateOther() {
    this.success = false;
    this.createdSlug = '';
  }
}
