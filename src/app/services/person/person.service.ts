import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Person } from '../../interfaces/person-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = `${environment.apiUrl}/persons`;

  constructor(private _http: HttpClient) { }

  public getAllPersons(page: number = 1, limit: number = 10): Observable<Person[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this._http.get<Person[]>(this.apiUrl, { params });
  }

  public getPersonById(id: string): Observable<Person> {
    return this._http.get<Person>(`${this.apiUrl}/${id}`);
  }

  public createPerson(personData: Omit<Person, '_id'>): Observable<Person> {
    return this._http.post<Person>(this.apiUrl, personData);
  }

  public updatePerson(id: string, personData: Person): Observable<Person> {
    return this._http.put<Person>(`${this.apiUrl}/${id}`, personData);
  }

  public deletePerson(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
