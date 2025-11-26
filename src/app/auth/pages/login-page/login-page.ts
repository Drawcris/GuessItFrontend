import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../services/auth-service';
import { LoginDto } from '../../interfaces/login-dto';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
    imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
    ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);
    loginError: string = '';

    createUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

  onSubmit(){
      this.loginError = '';
      if (this.createUserForm.valid) {
        const payload: LoginDto = this.createUserForm.value as LoginDto;
        this.authService.login(payload.email, payload.password).subscribe({
          next: token => {
            console.log('Login successful, token:', token);
            this.router.navigate(['/']);
          },
          error: err => {
            console.error('Login failed - Status:', err.status, 'Error:', err);
            if (err.status === 401) {
              this.loginError = 'Email lub hasło jest nieprawidłowe';
            } else if (err.status === 404) {
              this.loginError = 'Konto o tym emailu nie istnieje';
            } else if (err.status === 400) {
              this.loginError = 'Nieprawidłowe dane. Sprawdź email i hasło.';
            } else {
              this.loginError = 'Błąd podczas logowania. Spróbuj później.';
            }
          }
        });
      }
  }


}
