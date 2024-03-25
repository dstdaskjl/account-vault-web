import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignupService } from './signup.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form !: FormGroup;
  usernames !: string[];
  isRequestCreated = true;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: SignupService,
    private _snackBar: MatSnackBar
  ) {
    this.loadUsernames();
    this.creatForm();
    this.setUsernameListener();
  }

  creatForm(){
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null,[Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  loadUsernames(){
    this.service.getUsernames().subscribe((usernames: any) => {
      this.usernames = usernames;
    })
  }

  onEnterPressed(){
    if (this.form.valid){
      this.onRequestClick();
    }
  }

  onRequestClick(){
    const firstName = this.form.get('firstName')?.value;
    const lastName = this.form.get('lastName')?.value;
    const username = this.form.get('username')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    this.auth.signUp({firstName, lastName, username, email, password}).subscribe(
      (data: any) => {
        if (data.isAccountCreated){
          this.isRequestCreated = true;
          this._snackBar.open('Account request created')
          this.router.navigate(['home'])
        } else {
          this.isRequestCreated = false;
        }
      }
    );
  }

  setUsernameListener(){
    this.form.get('username')?.valueChanges.subscribe((value: any) => {
      if (this.usernames.includes(value)){
        this.form.get('username')?.setErrors({});
      } else {
        this.form.get('username')?.setErrors(null);
      }
    })
  }
}
