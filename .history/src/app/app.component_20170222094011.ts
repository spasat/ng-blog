import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private loginService: AuthServiceService) { }

  login() {
    console.log('1');
    this.loginService.login();
  }

  getUsers() {
    this.loginService.getUsers()
  }
}
