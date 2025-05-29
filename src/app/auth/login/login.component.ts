import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm!: FormGroup;
  public errorMessage: string = ''

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public login() {
    if(this.loginForm.valid) {
      this._authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next : (response) => {
          console.log('Inicio de sesión exitoso', response);
          this._router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
          this.errorMessage = 'Credenciales inválidas';
        }
      });
    } else this.errorMessage = 'Por favor, completa todos los campos correctamente.';
  }

}
