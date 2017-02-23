import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './../auth-service.service';

@Component({
  selector: 'app-blog-header',
  templateUrl: './blog-header.component.html',
  styleUrls: ['./blog-header.component.scss']
})
export class BlogHeaderComponent implements OnInit {

  constructor(private loginService: AuthServiceService) { }

  ngOnInit() {}
  
  login() {
    this.loginService.login();
  }
}
