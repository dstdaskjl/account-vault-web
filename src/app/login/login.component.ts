import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LoginService,
  ){
    this.creatForm();
  }

  creatForm(){
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onEnterPressed(){
    if (this.form.valid){
      this.onLogInClick();
    }
  }

  onLogInClick(){
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    this.service.login(email, password).subscribe((token: any) => {
      if (token && token.key && token.user_id){
        localStorage.setItem("currentToken", JSON.stringify(token));
        this.router.navigate(['home']);
      } else {
        this.isLoginInvalid = true;
      }
    });
  }
}
