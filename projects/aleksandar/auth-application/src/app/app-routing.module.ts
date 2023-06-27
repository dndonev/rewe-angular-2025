import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthGuard } from 'src/services/auth-guard.service';
import { RegisterComponent } from 'src/components/register/register.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
