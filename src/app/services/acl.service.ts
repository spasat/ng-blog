import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RIGHTS } from '../models/rights';

@Injectable()
export class AclService {

  constructor(
    private auth: AuthService,
  ) { }


  isArticleOwner(article: { author: { _id: string } }): boolean {
    const user = this.auth.getSessionUser();
    if (
      user &&
      (
        (article.author && user._id === article.author._id) ||
        user.rights.indexOf(RIGHTS.ADMIN) !== -1
      )
    ) {
      return true;
    }
    return false;
  }

  isCommentOwner(comment: { message: string, author: { _id: string } }): boolean {
    const user = this.auth.getSessionUser();
    if (
      user &&
      (
        (comment.author && user._id === comment.author._id) ||
        user.rights.indexOf(RIGHTS.ADMIN) !== -1
      )
    ) {
      return true;
    }
    return false;
  }

}
