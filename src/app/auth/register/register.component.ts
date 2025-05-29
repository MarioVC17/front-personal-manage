import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public registerForm!: FormGroup;
  public errorMessage: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router) {
      this.registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      })
  }

  public register() {
    if(this.registerForm.valid) {
      this._authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this._router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Error al registrar', error);
          this.errorMessage = error?.error?.message || 'Ocurrió un error durante el registro.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.'
    }
  }
}
