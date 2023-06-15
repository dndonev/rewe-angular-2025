import { Injectable } from '@angular/core';
import { IUser, TUsers } from 'src/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() { }

  users: TUsers = [
    {
      username: 'admin',
      password: 'admin'
    },
    {
      username: 'Gosho',
      password: '1234'
    }
  ]

  login(user: IUser): boolean {
    const availableUser = this.users.find(u => u.username === user.username && u.password === user.password);
    this.isLoggedIn = !!availableUser;
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
