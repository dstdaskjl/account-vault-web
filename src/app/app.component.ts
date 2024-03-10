import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { AppService } from './app.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  showToolbar: boolean;
  showSidenav: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private service: AppService,
  ) {
    this.isAuthenticated = false
    this.showToolbar = true;
    this.showSidenav = false;
    this.addRouterEventListener();
  }

  addRouterEventListener() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd){
        switch (event.url){
          case '/':
            this.showToolbar = false;
            this.showSidenav = false;
            break;
          case '/login':
            this.showToolbar = false;
            this.showSidenav = false;
            break;
          case '/home':
            this.showToolbar = true;
            this.showSidenav = false;
            break;
          default:
            this.showToolbar = false;
            this.showSidenav = true;
            break;
        }
      }
    })
  }

  navigateTo(url: string){
    this.router.navigate([url]);
  }

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated;
    this.navigateTo('home');
  }

  onSignInClick() {
    this.navigateTo('login');
  }

  onSignOutClick() {
    this.auth.logout();
    this.navigateTo('login');
  }
}
