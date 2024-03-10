import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppService } from './app.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'account_vault';
  isAuthenticated: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private service: AppService,
  ) {
    this.isAuthenticated = this.auth.isAuthenticated;
  }

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

  onSignInClick() {
    this.router.navigate(['login']);
  }

  onSignOutClick() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
