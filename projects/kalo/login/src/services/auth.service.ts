import { Injectable } from '@angular/core';
import { IUser, TUsers } from 'src/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn: boolean=false;
  users:TUsers= [
    {
      username: 'John',
      password:'123'
    },
    { 
      username: 'Ivan',
      password:'321'
    }
  ]

  login(user:IUser):boolean{
   const availableUser= this.users.find(u=>u.username===user.username&&u.password===user.password);
   this.isLoggedIn=!!availableUser;
    // this.users.includes(user)
     return this.isLoggedIn
    }
    logout(){
      this.isLoggedIn=false;
    }
}
