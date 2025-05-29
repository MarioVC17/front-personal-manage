import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../../interfaces/person-interface';
import { PersonService } from '../../services/person/person.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PersonCreateComponent } from '../person-create/person-create.component';
import { MatIconModule } from '@angular/material/icon';
import { PersonEditComponent } from '../person-edit/person-edit.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatListModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  public dataSource = new MatTableDataSource<Person>([]);
  public currentPage = 0;
  public pageSize = 10;
  public itemsPerPage = 10;
  public totalItems = 0;

  constructor(
    private _personService: PersonService,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  public handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPersons();
  }

  public deletePerson(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      this._personService.deletePerson(id).subscribe({
          next: (response) => {
            this.loadPersons();
            this._snackBar.open('Persona eliminada exitosamente', 'Cerrar', {
              duration: 3000,
            });
          },
          error: (error) => {
            this._snackBar.open('Error al eliminar la persona', 'Cerrar'), {
              duration: 5000,
              panelClass: ['error-snackbar']
            }
          }
        });
    }
  }

  public openCreateDialog() {
    const dialogRef = this._dialog.open(PersonCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPersons();
      }
    });
  }

  public openEditDialog(person: Person) {
    const dialogRef = this._dialog.open(PersonEditComponent, {
      data: person
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPersons();
      }
    });
  }

  private loadPersons() {
    this._personService.getAllPersons(this.currentPage + 1, this.pageSize)
      .subscribe({
        next: (response: any) => {
          this.dataSource.data = response;
          this.totalItems = response.total;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.error('Error al cargar las personas', error);
        }
      });
  }

}
