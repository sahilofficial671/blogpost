import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private apiService: ApiService
  ) { }

  mapToBlog(params: any): Blog | any{
    let data = null;

    if(params !== undefined && params !== null){
      if(params.constructor == String){
        data = JSON.parse(params.toString());
      }else if(params.constructor == Object){
        data = params;
      }
    }

    if(data != null){
      const blog = new Blog();
      blog._id = data._id;
      blog.title = data.title;
      blog.description = data.description;
      blog.createdAt = data.createdAt;
      blog.updatedAt = data.updatedAt;

      if(data.user){
        blog.user = new User();
        blog.user.name = data.user.name;
        blog.user.email = data.user.email;
        blog.user.firstName = (data.user.name && data.user.name.split(' ')[0]) || null;
      }

      return blog;
    }

    return data;
  }

  mapToBlogs(data: any): Blog[]{
    const blogs = [];

    for (let i = 0; i < data.length; i++) {
      blogs.push(this.mapToBlog(data[i]));
    }

    return blogs;
  }

  createBlog(blog: any){
    return this.apiService
      .post('/blog', blog);
  }
}
