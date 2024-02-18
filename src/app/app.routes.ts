import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { VaultComponent } from './vault/vault.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'home', component: AppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'vault', component: VaultComponent, canActivate: [AuthGuardService]},
];
