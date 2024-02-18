import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { VaultService } from './vault.service';

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './vault.component.html',
  styleUrl: './vault.component.css'
})
export class VaultComponent implements OnInit {
  list !: any[];

  constructor(
    private service: VaultService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  setList() {
    this.service.getVault().subscribe((res: any) => {
      this.list = res;
    });
  }
}
