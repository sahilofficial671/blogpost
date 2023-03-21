import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { BlogCreateComponent } from './modules/blog/blog-create/blog-create.component';
import { BlogDetailComponent } from './modules/blog/blog-detail/blog-detail.component';
import { BlogHomeComponent } from './modules/blog/blog-home/blog-home.component';
import { ProfileComponent } from './modules/blog/profile/profile.component';

const routes: Routes = [
  { path: "", redirectTo: "/blogs", pathMatch: "full" },
  {path: 'login', canActivate: [GuestGuard], component: LoginComponent},

  // Authenticated Routes
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},

  // Blog Routes
  {path: 'blogs', component: BlogHomeComponent},
  {path: 'blogs/create', canActivate: [AuthGuard], component: BlogCreateComponent},
  {path: 'blogs/:blogId', component: BlogDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
