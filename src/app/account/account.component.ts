import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../models/user.interface';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MdDialog } from '@angular/material';
import { DialogPasswordComponent } from '../dialogs/password/password.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user: UserInterface;
  userForm: FormGroup;
  userFormError: string;
  editMode = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
    this.user = this.auth.getSessionUser();
    this.buildUserForm();
  }

  buildUserForm() {
    this.userForm = this.fb.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, Validators.required],
    });
  }

  activateEditMode() {
    this.editMode = true;
  }

  deactivateEditMode() {
    this.editMode = false;
  }

  onEditCancel() {
    this.deactivateEditMode();
    // reset form when cancel edit modee
    this.buildUserForm();
    this.userFormError = '';
  }

  onEditSubmit() {
    const user = this.userForm.value;
    this.userService
      .update(user)
      .subscribe(
      (data) => {
        this.user = this.auth.getSessionUser();
        this.deactivateEditMode();
      },
      (err) => {
        try {
          const res = err.json();
          this.userFormError = res.error.toString();
        } catch (e) {
          this.userFormError = 'Something went wrong';
        }
      }
      );
  }

  openPasswordEditDialog() {
    const passwordDialog = this.dialog.open(DialogPasswordComponent);
    passwordDialog
      .afterClosed()
      .subscribe(
      (data) => { },
      (err) => { console.log(err); });
  }

}
