import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.isAuthenticated = false
  }

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated;
    if (this.isAuthenticated){
      this.router.navigate(['vault'])
    }
  }
}
