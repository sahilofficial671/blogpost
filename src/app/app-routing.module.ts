import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { ProfileComponent } from './modules/blog/profile/profile.component';

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  {path: 'login', canActivate: [GuestGuard], component: LoginComponent},

  // Authenticated Routes
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
