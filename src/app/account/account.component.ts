import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../models/user.interface';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MdDialog } from '@angular/material';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: UserInterface;
  userForm: FormGroup;
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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  activateEditMode() {
    this.editMode = true;
  }

  deactivateEditMode() {
    this.editMode = false;
  }

  onEditSubmit() {
    console.log(this.userForm.value);
  }

  openPasswordEditDialog() {
    let passwordDialog = this.dialog.open(PasswordDialogComponent);
  
  }

}
