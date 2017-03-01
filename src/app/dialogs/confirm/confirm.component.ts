import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  data: Object;
  constructor(
    private dialogRef: MdDialogRef<DialogConfirmComponent>
  ) { }

  ngOnInit() {
    const defaultData = this.getDefaults();
    if (this.dialogRef.config.data) {
      this.data = Object.assign(defaultData, this.dialogRef.config.data);
    }
  }

  getDefaults() {
    const defaultData = {
      title: 'Confrim',
      message: 'Do you confirm courrent action?'
    };
    return defaultData;
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

}
