import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPersonDetails } from './types';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getPerson(): Promise<IPersonDetails | undefined> {
    return this.http.get<IPersonDetails>('https://jsonplaceholder.typicode.com/users/1').toPromise();
  }
}
