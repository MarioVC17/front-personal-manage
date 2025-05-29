import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { PersonService } from '../../services/person/person.service';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Person } from '../../interfaces/person-interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-create',
  imports: [ 
    ReactiveFormsModule, 
    RouterModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatDialogActions 
  ],
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.scss'
})
export class PersonCreateComponent {

  public form!: FormGroup;
  errorMessage = '';

  constructor(
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _dialogRef: MatDialogRef<PersonCreateComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.form = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: [''],
      department: [''],
      hireDate: [''],
      salary: [''],
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      this.errorMessage = '';
      const newPerson: Omit<Person, '_id'> = this.form.value;
      this._personService.createPerson(newPerson)
        .subscribe({
          next: (person) => {
            this._dialogRef.close(true);
            this._snackBar.open('Persona creada exitosamente', 'Cerrar', {
              duration: 3000,
            });
          },
          error: (error) => {
            this.errorMessage = error?.error?.message || 'Ocurrió un error al crear la persona.';
            this._snackBar.open('Error al crear la persona', 'Cerrar', { // Muestra mensaje de error
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this._snackBar.open('Por favor, completa todos los campos correctamente', 'Cerrar', { // Muestra mensaje de error
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

  public onCancel() {
    this._dialogRef.close(false);
  }

}
