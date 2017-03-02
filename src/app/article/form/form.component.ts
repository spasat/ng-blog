import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  @Input() error: string;
  @Input() buttonLabel: string;
  @Output() formSubmit: EventEmitter<FormData> = new EventEmitter<FormData>();
  private _data;

  form: FormGroup;
  imageFile: { name: string, file: File };
  defaultData: { title: string, category: Array<string>, body: string, image: string };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  @Input()
  set data(data) {
    this._data = data;
    if (data) {
      this.buildForm();
    }
  }

  get data() {
    return this._data;
  }

  buildForm() {
    const data = this.getDefaultData();
    this.form = this.fb.group({
      title: [data.title, Validators.required],
      category: this.fb.array(this.getCategoryForms(data.category)),
      body: [data.title, Validators.required]
    });
  }

  getCategoryForms(categories: Array<string>) {
    const forms: Array<FormControl> = [];
    for (const category of categories) {
      forms.push(new FormControl(category));
    }

    return forms;
  }

  getDefaultData(): { title: string, category: Array<string>, body: string, image: string } {
    const defaultData = {
      title: '',
      category: ['Article'],
      body: '',
      image: ''
    };

    const data = this._data;
    if (data) {
      for (const key in defaultData) {
        if (defaultData.hasOwnProperty(key) && data.hasOwnProperty(key) && data[key]) {
          defaultData[key] = data[key];
        }
      }
    }

    return defaultData;
  }

  onSubmit() {
    const articleFormData = this.getFormData();
    this.formSubmit.emit(articleFormData);
  }

  getFormData(): FormData {
    const data = this.form.value;
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {

        if (data[key] instanceof Array) {
          // map form data as array
          data[key]
            .forEach(item => {
              if (item) {
                formData.append(key + '[]', item);
              }
            });
          continue;
        }
        formData.append(key, data[key]);

      }
    }

    if (this.imageFile) {
      formData.append('image', this.imageFile.file, this.imageFile.name);
    }

    return formData;
  }

  addCategory() {
    const control = <FormArray>this.form.controls['category'];
    control.push(new FormControl(''));
  }

  removeCategory(idx) {
    const control = <FormArray>this.form.controls['category'];
    control.removeAt(idx);
  }

  reset() {
    this.form.reset();
  }

}
