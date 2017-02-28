import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss'],
})
export class ArticleCreateComponent implements OnInit {
  form: FormGroup;
  imageFile: { name: string, file: File };
  error: string;
  success: boolean;
  createdSlug: string;

  constructor(private fb: FormBuilder, private articleService: ArticleService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: this.fb.array([
        new FormControl('Article')
      ]),
      body: ['', Validators.required]
    });
  }

  onFormSubmit() {
    const article = this.form.value;

    this.articleService
      .create(this.convertToFormData(article))
      .subscribe(
      (res) => {
        this.success = true;
        this.form.reset();
        this.createdSlug = res.slug;
      },
      (err) => {
        const json = err.json();
        this.error = json.error;
      }
      );
  }

  convertToFormData(data): FormData {
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

  onCreateOther() {
    this.success = false;
    this.createdSlug = '';
  }
}
