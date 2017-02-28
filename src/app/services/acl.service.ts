import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RIGHTS } from '../models/rights';

@Injectable()
export class AclService {

  constructor(
    private auth: AuthService,
  ) { }


  isArticleOwner(article) {
    const user = this.auth.getSessionUser();
    if (!article.author || user._id === article.author._id || user.rights.indexOf(RIGHTS.ADMIN) !== -1) {
      return true;
    }
    return false;
  }

}
