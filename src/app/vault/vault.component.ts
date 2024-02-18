import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

import { VaultService } from './vault.service';

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [HttpClientModule, MatGridListModule],
  templateUrl: './vault.component.html',
  styleUrl: './vault.component.css'
})
export class VaultComponent implements OnInit {
  vault !: any[];

  constructor(
    private service: VaultService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const v = await this.service.getVault();
  }
}
