import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  breadcrumb: Array<{ title: string, url: string }> = [];
  constructor() { }

  ngOnInit() {
    this.buildBreadcrumbs();
  }

  buildBreadcrumbs() {
    this.breadcrumb.push({ title: 'Home', url: '/' });
    this.breadcrumb.push({ title: 'About', url: undefined });
  }

}
