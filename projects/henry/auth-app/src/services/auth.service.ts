import { Injectable } from '@angular/core';
import { IUser, TUsers } from 'src/types/user.types';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject$ = new BehaviorSubject(false);

  constructor() { }

  users: TUsers = [
    {
      username: 'admin',
      password: '12345admin'
    },
    {
      username: 'Gosho',
      password: '1234'
    }
  ]

  getLoggedInSubject(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable()
  }

  login(user: IUser): void {

    const availableUser = this.users.find(u => u.username === user.username && u.password === user.password);

    this.isLoggedInSubject$.next(!!availableUser)
  }

  logout(): void {
    this.isLoggedInSubject$.next(false)
  }
}
