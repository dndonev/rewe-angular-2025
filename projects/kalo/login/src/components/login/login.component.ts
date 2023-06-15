import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { IUser } from 'src/types/user.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = ''
  password: string = ''

  constructor(private authService: AuthService, private router: Router) {

  }

  isDisabled(): boolean {
    return this.username === '' || this.password === ''
  }

  onButtonClick(): void {
    const user: IUser = {
      username: this.username,
      password: this.password
    };
    if (this.authService.login(user)) {
      alert('Logged in!')
      this.router.navigate(['dashboard', { username: user.username }])
    } else { alert('Error!') }
  }
}
