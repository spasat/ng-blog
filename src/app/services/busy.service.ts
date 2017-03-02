import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BusyService {
  private _busy: Subscription;
  private _subject = new Subject<Subscription>();
  constructor() { }

  set busy(busy: Subscription) {
    this._busy = busy;
    this._subject.next(this._busy);
  }

  get busy(): Subscription {
    return this._busy;
  }

  getBusyObserver() {
    return this._subject;
  }
}
