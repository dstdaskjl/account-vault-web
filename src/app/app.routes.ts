import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'home', component: AppComponent},
  { path: 'vault', component: ListComponent},
  { path: 'login', component: LoginComponent}
];
