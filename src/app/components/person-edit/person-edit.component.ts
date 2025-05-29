import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Person } from '../../interfaces/person-interface';
import { PersonService } from '../../services/person/person.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-edit',
  imports: [ 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatDialogActions 
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent {
  public editForm!: FormGroup;
  public errorMessage = '';
  public person!: Person;

  
  constructor(
    private _fb: FormBuilder,
    private _personService: PersonService,
    public _dialogRef: MatDialogRef<PersonEditComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) {
    this.person = data;
    this.editForm = this._fb.group({
      firstName: [this.person.firstName, Validators.required],
      lastName: [this.person.lastName, Validators.required],
      email: [this.person.email, [Validators.required, Validators.email]],
      position: [this.person.position || ''],
      department: [this.person.department || ''],
      salary: [this.person.salary !== undefined ? this.person.salary : ''],
    });
  }

  public onSubmit() {
    if(this.editForm.valid) {
      this.errorMessage = '';
      const updatedPerson: Person = { ...this.person, ...this.editForm.value };
      this._personService.updatePerson(updatedPerson._id!, updatedPerson).subscribe({
        next: (person) => {
          this._dialogRef.close(true);
          this._snackBar.open('Persona actualizada exitosamente', 'Cerrar', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'Ocurrió un error al actualizar la persona.';
          this._snackBar.open('Error al actualizar la persona', 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this._snackBar.open('Por favor, completa todos los campos correctamente', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

  public onCancel() {
    this._dialogRef.close(false);
  }
}
