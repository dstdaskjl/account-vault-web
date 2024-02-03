import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.service.isAuthenticated().subscribe((isAuthenticated: any) => {
      if (isAuthenticated){
        console.log(1)
        this.router.navigate(['vault'])
      } else {
        console.log(2)
        this.router.navigate(['login'])
      }
    });
  }
}
