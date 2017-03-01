import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateConfirm } from '../../validators/password.validator';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dialog-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class DialogPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  error = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    public dialogRef: MdDialogRef<DialogPasswordComponent>
  ) { }

  ngOnInit() {
    this.buildPasswordForm();
  }


  buildPasswordForm() {
    this.passwordForm = this.fb.group(
      {
        password: ['', Validators.required],
        password_confirm: ['', Validators.required],
        // old_password: ['', Validators.required]
      },
      {
        validator: validateConfirm('password', 'password_confirm')
      }
    );
  }

  onPasswordSubmit() {
    this.error = '';
    const password = this.passwordForm.get('password').value;
    this.userService
      .update({ password: password })
      .subscribe(
      data => {
        this.dialogRef.close(password);
      },
      (err) => {
        const res = err.json();
        if (res.error) {
          this.error = res.error;
        }
      }
      );
  }

}
