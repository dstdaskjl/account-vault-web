import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'home', component: AppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'vault', component: ListComponent, canActivate: [AuthGuardService]},
];
