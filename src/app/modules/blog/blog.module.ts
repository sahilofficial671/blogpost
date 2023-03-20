import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ProfileComponent,
    BlogHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class BlogModule { }
