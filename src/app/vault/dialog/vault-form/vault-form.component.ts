import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vault-form',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './vault-form.component.html',
  styleUrl: './vault-form.component.css'
})
export class VaultFormComponent {
  dialogRef !: MatDialogRef<VaultFormComponent>;
  form !: FormGroup;

  constructor(
    dialogRef: MatDialogRef<VaultFormComponent>,
    fb: FormBuilder,
  ){
    this.dialogRef = dialogRef;
    this.form = fb.group({
      website: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  onCancelClick(){
    this.dialogRef.close({
      isCanceled: true
    });
  }

  onSaveClick(){
    this.dialogRef.close({
      isCanceled: false,
      data: this.form.getRawValue()
    });
  }
}
