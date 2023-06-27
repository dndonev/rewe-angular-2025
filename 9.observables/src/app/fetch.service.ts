import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface User {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  private isLoggedIn = new Subject<User>();

  constructor(private http: HttpClient) { }

  login() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(x => {
      this.isLoggedIn.next(x as User);
    });
  }

}
