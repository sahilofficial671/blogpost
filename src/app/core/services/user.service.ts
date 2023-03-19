import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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

      const name = data.name.split(" ");
      user.firstName = name[0];

      if(name[1]){
        user.lastName = name[1];
      }

      return user;
    }

    return null;
  }
}
