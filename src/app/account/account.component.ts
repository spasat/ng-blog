import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../models/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: UserInterface;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getSessionUser();
  }

}
