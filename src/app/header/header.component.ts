import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  avatarSrc: string;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  getUser(): User {
    return this.auth.getSessionUser();
  }
}
