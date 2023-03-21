import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  toast?: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private blogService: BlogService,
  ){};

  ngOnInit(){
    const query = this.route.snapshot.queryParams;

    if(query && Boolean(query['blogCreated'])){
      this.toast = {
        status: 'success',
        message: 'Blog Created Successfuly.'
      };

      // Auto hide in 7 sec
      setTimeout(() => {
        this.toast = {};
      }, 7000)
    }

    this.apiService
      .get('/blog')
      .subscribe((blogs) => {
        this.blogs = this.blogService.mapToBlogs(blogs);
      })
  }
}
