import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../services/auth-service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDto } from '../../interfaces/register-dto';
import { CommonModule } from '@angular/common';

// Custom validator dla hasła
function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

  if (!hasUpperCase || !hasSpecialChar) {
    return {
      passwordStrength: {
        hasUpperCase,
        hasSpecialChar
      }
    };
  }

  return null;
}

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  registerError: string = '';

  createUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), passwordValidator]),
    roleType: new FormControl(1 , [Validators.required])
    })

  onSubmit(){
      this.registerError = '';
      if (this.createUserForm.valid) {
        const payload: RegisterDto = this.createUserForm.value as RegisterDto;
        this.authService.register(payload.firstName, payload.lastName, payload.email, payload.password, payload.roleType)
          .subscribe({
            next: response => {
              console.log('Registration successful', response);
              this.router.navigate(['/login']);
            },
            error: err => {
              console.error('Registration failed', err);
              if (err.status === 400) {
                this.registerError = 'Email jest już zarejestrowany';
              } else if (err.status === 409) {
                this.registerError = 'Konto o tym emailu już istnieje';
              } else {
                this.registerError = 'Błąd podczas rejestracji. Spróbuj później.';
              }
            }
          })
      }
  }
}
