import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get('https://jsonplaceholder.typicode.com/users/1');
  }

  logIn() {
    // if the user is authenticated
    this.isLoggedIn = true;
  }
}
