import { CanActivateFn, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VaultComponent } from './vault/vault.component';
import { inject } from '@angular/core';

export const canActivate: CanActivateFn = ( ) => {
  return inject(AuthService).canActivate();
};

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'vault', component: VaultComponent, canActivate: [canActivate]},
];
