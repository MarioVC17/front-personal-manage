import { Component } from '@angular/core';
import { Person } from '../interfaces/person-interface';
import { ApexOptions } from 'ng-apexcharts';
import { PersonService } from '../services/person/person.service';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public departmentChartOptions: Partial<ApexOptions> | any;
  public salaryChartOptions: Partial<ApexOptions> | any;
  persons: Person[] = [];

  constructor(private _personService: PersonService) { }
}
