import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated){
      this.router.navigate(['vault']);
    }
  }
}
