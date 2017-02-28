import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  @Input() error: string;
  @Input() data;
  @Output() formSubmit: EventEmitter<FormData> = new EventEmitter<FormData>();

  form: FormGroup;
  imageFile: { name: string, file: File };
  defaultData: { title: string, category: Array<string>, body: string, image: string };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
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
    const article = {
      title: '',
      category: ['Article'],
      body: '',
      image: ''
    };

    if (this.data) {
      for (const key in this.data) {
        if (this.data.hasOwnProperty(key) && article.hasOwnProperty(key) && article[key]) {
          article[key] = this.data[key];
        }
      }
    }

    return article;
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
