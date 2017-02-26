import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { RIGHTS } from '../models/rights';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { validateConfirm } from '../validators/password.validator';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {
  public singInForm: FormGroup;
  public errors: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.singInForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        password_confirm: ['', Validators.required],
        is_subscribed: [false]
      },
      {
        validator: validateConfirm('password', 'password_confirm')
      }
    );
  }

  onSubmit() {
    const user: User = <User>this.singInForm.value;
    user.rights = [RIGHTS.USESR];

    this.userService
      .create(user)
      .subscribe(
      (res) => {
        this.auth.setSessionToken(res.token);
        this.auth.setSessionUser(res.user);
        this.router.navigate(['/']);
      },
      (res) => {
        this.errors = res.json().error;
      }
      );
  }

}
