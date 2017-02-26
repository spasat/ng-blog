import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateConfirm } from '../validators/password.validator';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
  passwordForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MdDialogRef<PasswordDialogComponent>
  ) { }

  ngOnInit() {
    this.buildPasswordForm();
  }


  buildPasswordForm() {
    this.passwordForm = this.fb.group(
      {
        password: ['', Validators.required],
        password_confirm: ['', Validators.required],
        old_password: ['', Validators.required]
      },
      {
        validator: validateConfirm('password', 'password_confirm')
      }
    );
  }


  onPasswordSubmit() {
    const password = this.passwordForm.get('password').value;
    this.dialogRef.close(password);
  }

}
