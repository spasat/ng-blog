import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { AuthService } from '../../services/auth.service';
import { AclService } from '../../services/acl.service';

@Component({
  selector: 'app-article-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class ArticleCommentsComponent implements OnInit {
  @Input() article;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private acl: AclService
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
    const comment: { message: string } = this.form.value;
    if (comment.message.trim()) {
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

  isOwner(comment) {
    return this.acl.isCommentOwner(comment);
  }

  delete(comment: { _id: string }) {
    this.commentsService.delete(this.article._id, comment._id);
  }
}
