import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user?: User | null;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
  ){
  };

  ngOnInit(){
    this.apiService
      .get('/auth/profile')
      .subscribe((response) => {
        if(response.user){
          this.user = this.userService.mapToUser(response.user);
        }
      });
  }
}
