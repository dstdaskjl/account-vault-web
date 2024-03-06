import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { VaultFormComponent } from './dialog/vault-form/vault-form.component';
import { VaultViewComponent } from './dialog/vault-view/vault-view.component';
import { VaultService } from './vault.service';

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatDialogModule, MatGridListModule, MatIconModule],
  templateUrl: './vault.component.html',
  styleUrl: './vault.component.css'
})
export class VaultComponent implements OnInit {
  vault !: any;
  websites !: string[];
  iconUrls !: {[website: string]: string}

  constructor(
    private service: VaultService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.vault = await this.service.getVault();
    this.websites = Object.keys(this.vault);
    this.websites.sort();
    this.iconUrls = {}
    for (const website of this.websites){
      this.iconUrls[website] = 'https://logo.clearbit.com/' + website;
    }
  }

  onCreateClick(){
    const dialogRef = this.dialog.open(
      VaultFormComponent,
      {
        width: '350px',
        disableClose: true,
        autoFocus: false,
      }
    );
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res.isCanceled){
        this.service.create(res.data).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  onWebsiteClick(website: string){
    const dialogRef = this.dialog.open(
      VaultViewComponent,
      {
        data: {
          website,
          userInfo: this.vault[website],
          iconUrl: this.iconUrls[website],
        },
        width: '400px',
        autoFocus: false,
      }
    );
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.isUpdated){
        this.ngOnInit();
      }
    });
  }
}
