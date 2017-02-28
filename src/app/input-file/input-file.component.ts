import { Component, OnInit, Output, Input, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
  @Input() fileName: string;
  @Input() required: boolean;
  @Output() file: EventEmitter<{ name: string, file: File }> = new EventEmitter<{ name: string, file: File }>();
  localFile: { name: string, file: File };

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event) {
    this.localFile = null;
    if (event.target.files.length > 0) {
      this.localFile = { name: event.target.value, file: event.target.files[0] };
    }

    this.file.emit(this.localFile);
  }
}
