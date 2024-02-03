import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  list !: any[];

  constructor(
    private service: ListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.isAuthenticated().subscribe((isAuthenticated: any) => {
      console.log(isAuthenticated)
      if (!isAuthenticated){
        this.router.navigate(['login'])
      }
    })
    // this.setList();
  }

  setList() {
    this.service.getVault().subscribe((res: any) => {
      this.list = res;
      console.log(res)
    });
  }
}
