import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { VaultService } from '../../vault.service';

@Component({
  selector: 'app-vault-view',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatListModule],
  templateUrl: './vault-view.component.html',
  styleUrl: './vault-view.component.css'
})
export class VaultViewComponent {
  website !: string;
  userInfo !: any[];
  iconUrl !: string;
  isEditable !: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VaultViewComponent>,
    private service: VaultService,
  ){
    this.website = data.website;
    this.userInfo = data.userInfo;
    this.iconUrl = data.iconUrl;
    this.isEditable = false;
  }

  onCancelClick(){
    this.isEditable = false;
  }

  onDeleteClick(selected: any){
    selected.forEach((element:any) => {
      const data = {
        website: this.website,
        username: element.value.username,
        password: element.value.password,
      }
      this.service.delete(data).subscribe(() => {
        this.userInfo = this.userInfo.filter(
          element => element.username !== data.username && element.password !== data.password
        );
        if (this.userInfo.length === 0){
          this.dialogRef.close({
            isUpdated: true
          });
        }
      });
    });
    this.isEditable = false;
  }

  onUpdateClick(){
    this.isEditable = true;
  }
}
