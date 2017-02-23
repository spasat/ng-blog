import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from './../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthServiceService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(value: any) {
    const email = this.loginForm.get('email');
    const password = this.loginForm.get('password');
    console.log(this.loginForm);
    if (this.loginForm.status === 'VALID') {
      this.auth.login(email, password);
    }

  }

}
