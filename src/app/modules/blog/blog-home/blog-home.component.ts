import { Component } from '@angular/core';
import { Blog } from 'src/app/core/models/blog.model';
import { ApiService } from 'src/app/core/services/api.service';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent {
  blogs: Blog[] = [];

  constructor(
    private apiService: ApiService,
    private blogService: BlogService,
  ){};

  ngOnInit(){
    this.apiService
      .get('/blog')
      .subscribe((blogs) => {
        this.blogs = this.blogService.mapToBlogs(blogs);

        console.log(this.blogs);
      })
  }
}
