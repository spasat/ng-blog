import { Directive, Input, ElementRef } from '@angular/core';
import { GravatarService } from '../services/gravatar.service';

@Directive({
  selector: '[appGravatar]'
})
export class GravatarDirective {
  private _email: string;
  @Input() size: number;

  constructor(
    private gravatarService: GravatarService,
    private el: ElementRef
  ) { }

  setGravatrSrc() {
    this.el.nativeElement.src = this.gravatarService.getUserAvatarSrc(this._email, this.size);
  }

  @Input()
  set email(email: string) {
    this._email = email;
    this.setGravatrSrc();
  }
}
