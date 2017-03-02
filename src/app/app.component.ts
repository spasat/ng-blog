import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Rx';
import { BusyService } from './services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  busy: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private busyService: BusyService
  ) { }

  ngOnInit() {
    this.busyService
      .getBusyObserver()
      .subscribe((sub) => this.busy = sub);
    this.setPageTitle();
  }

  /**
   * Set page title from router data
   */
  setPageTitle() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        const title = (event['title'] ? event['title'] + '|' : '') + 'Blog';
        this.titleService.setTitle(title);
      });
  }

}
