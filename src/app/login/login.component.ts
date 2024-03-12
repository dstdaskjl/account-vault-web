import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form !: FormGroup;
  isLoginInvalid = false;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LoginService,
  ){
    this.creatForm();
  }

  creatForm(){
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onEnterPressed(){
    if (this.form.valid){
      this.onLogInClick();
    }
  }

  onLogInClick(){
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    this.auth.login({username, password}).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.access);
        this.router.navigate(['vault']);
      },
      () => {
        this.isLoginInvalid = true;
      }
    );
  }
}
