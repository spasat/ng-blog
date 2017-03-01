import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class GravatarService {
  private defaultSize = 20;
  constructor() { }

  getUserAvatarSrc(email: string, size?: number) {
    if (!size) {
      size = this.defaultSize;
    }
    const hashEmail = Md5.hashStr(email);
    const src = `https://www.gravatar.com/avatar/${hashEmail}?s=${size}`;
    return src;
  }
}
