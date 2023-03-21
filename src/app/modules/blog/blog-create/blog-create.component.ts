import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent {
  title?: string;
  description?: string;
  isSubmitted?: Boolean = false;
  error?: string;
  form!: FormGroup;

  constructor(
    private router: Router,
    private blogService: BlogService
  ) {};

  ngOnInit(){
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(150),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1000),
      ])
    });
  }
  createBlog() {
    if(this.form.valid){
      this.form.disable();
      this.isSubmitted = true;

      const blog = {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
      };

      this.blogService.createBlog(blog)
        .subscribe((response) => {
          this.router.navigate(['/blogs'], {
            queryParams: {
              blogCreated: true
            }
          });
        }, err => {
          this.form.enable()
          console.log(err);
          this.error = err.message;
          this.isSubmitted = false;
        });
    }
  }
}
