import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {
  @Input() sideNav;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
