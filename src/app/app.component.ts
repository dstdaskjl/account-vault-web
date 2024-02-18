import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'account_vault';

  constructor(
    private service: AppService,
    private auth: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    if (await this.auth.isAuthenticated()){
      this.router.navigate(['vault'])
    } else {
      this.router.navigate(['login'])
    }
  }
}
