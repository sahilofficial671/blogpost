import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private blogService: BlogService
  ) { }

  mapToUser(params:any): User|null{

    let data = null;

    if(params !== undefined && params !== null){
      if(params.constructor == String){
        data = JSON.parse(params.toString());
      }else if(params.constructor == Object){
        data = params;
      }
    }

    if(data != null && data._id){
      const user = new User();
      user._id = data._id;
      user.name = data.name;
      user.email = data.email;
      user.createdAt = data.createdAt;
      user.updatedAt = data.updatedAt;

      const name = data.name.split(" ");
      user.firstName = name[0];

      if(name[1]){
        user.lastName = name[1];
      }

      user.blogs = [];

      if(data['blogs'] && Array(data['blogs']).length > 0){
        for (let i = 0; i < data['blogs'].length; i++) {
          const blog = data['blogs'][i];

          user.blogs.push(this.blogService.mapToBlog(blog));
        }
      }

      return user;
    }

    return null;
  }
}
