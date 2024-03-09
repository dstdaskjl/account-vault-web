import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { VaultFormComponent } from './dialog/vault-form/vault-form.component';
import { VaultViewComponent } from './dialog/vault-view/vault-view.component';
import { VaultService } from './vault.service';

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './vault.component.html',
  styleUrl: './vault.component.css'
})
export class VaultComponent implements OnInit {
  vault !: any;
  websites !: string[];
  iconUrls !: {[website: string]: string}
  form !: FormGroup;
  cols !: number;

  constructor(
    private service: VaultService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      search: [null]
    })
    this.cols = window.innerWidth / 200;
  }

  async ngOnInit(): Promise<void> {
    this.vault = await this.service.getVault();
    this.updateDisplayedWebsites(this.vault);
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
          const website = res.data.website;
          const username = res.data.username;
          const password = res.data.password;
          if (website in this.vault){
            this.vault[website].push({username, password});
          } else {
            this.vault[website] = [{username, password}];
          }
          this.onSearchValueChange();
        });
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.cols = window.innerWidth / 200;
  }

  onSearchValueChange(){
    const value = this.form.get('search')?.value || '';
    const tempVault: any = {};
    Object.keys(this.vault).forEach((key: string) => {
      if (key.includes(value)){
        tempVault[key] = this.vault[key];
      } else {
        tempVault[key] = [];
        for (const userInfo of this.vault[key]){
          if (userInfo.username.includes(value) || userInfo.password.includes(value)){
            tempVault[key] = userInfo;
          }
        }
        if (tempVault[key].length === 0){
          delete tempVault[key];
        }
      }
    });
    this.updateDisplayedWebsites(tempVault);
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

  updateDisplayedWebsites(vault: any){
    this.websites = Object.keys(vault);
    this.websites.sort();
    this.iconUrls = {}
    for (const website of this.websites){
      this.iconUrls[website] = 'https://logo.clearbit.com/' + website;
    }
  }
}
