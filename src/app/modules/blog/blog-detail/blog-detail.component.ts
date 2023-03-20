import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/core/models/blog.model';
import { ApiService } from 'src/app/core/services/api.service';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {
  blog?: Blog;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private blogService: BlogService,
  ){ };

  ngOnInit(){
    const blogId = this.route.snapshot.params['blogId'];

    this.apiService
      .get('/blog/' + blogId)
      .subscribe((blog) => {
        this.blog = this.blogService.mapToBlog(blog);
      })
  }
}
