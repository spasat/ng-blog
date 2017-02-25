import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService) { }

  ngOnInit() { }

  logout() {
    this.auth.logout();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  getUser(): User {
    return this.auth.getSessionUser();
  }
}
