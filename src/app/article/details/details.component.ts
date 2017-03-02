import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { AclService } from '../../services/acl.service';
import { MdDialogRef, MdDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../dialogs/confirm/confirm.component';

@Component({
  selector: 'app-article-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  slug: string;
  article;
  imageHost = environment.apiImageHost;
  breadcrumb: Array<{ title: string, url: string }> = [];

  constructor(
    private auth: AuthService,
    private articleService: ArticleService,
    private acl: AclService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialog: MdDialog) { }

  ngOnInit() {
    this.slug = this.activeRoute.snapshot.params['slug'];
    this.buildBreadcrumbs();
    if (!this.article) {
      this.getArticle();
    }
  }

  buildBreadcrumbs() {
    this.breadcrumb.push({ title: 'Home', url: '/' });
    this.breadcrumb.push({ title: 'Articles', url: '/' });
  }

  private getArticle() {
    this
      .articleService
      .getArticleBySlug(this.slug)
      .subscribe(
      (data) => {
        this.article = data;
        this.breadcrumb.push({ title: data.title, url: undefined });
      },
      (err) => { this.router.navigate(['/404']); }
      )
      ;
  }

  isOwner() {
    return this.acl.isArticleOwner(this.article);
  }

  private deleteArticle() {
    this.articleService
      .delete(this.article._id)
      .subscribe((res) => {
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err.json());
      });
  }

  onDelete() {
    const dialogInst: MdDialogRef<DialogConfirmComponent> = this.dialog
      .open(
      DialogConfirmComponent, {
        data: {
          title: 'Remove Article',
          message: 'Are you sure you want to remove this article?'
        }
      });

    dialogInst
      .afterClosed()
      .subscribe(
      (isConfirmed) => {
        if (isConfirmed) { this.deleteArticle(); }
      });

  }

  showComments() {
    return this.auth.isLoggedIn()
      || (this.article && this.article.hasOwnProperty('comments') && this.article.comments.length);
  }

}
