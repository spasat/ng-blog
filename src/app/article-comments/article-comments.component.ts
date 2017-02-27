import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from '../services/comments.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss']
})
export class ArticleCommentsComponent implements OnInit {
  @Input() article;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      message: ['', Validators.required]
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onFormSubmit() {
    const comment = this.form.value;
    this.commentsService
      .add(this.article._id, comment)
      .subscribe((coments) => {
        this.article.comments = coments;
        this.form.reset();
      },
      (err) => console.log)
      ;
  }
}
