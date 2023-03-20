import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ProfileComponent,
    BlogHomeComponent,
    BlogDetailComponent,
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
