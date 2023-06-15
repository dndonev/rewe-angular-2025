import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from 'src/types/user.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  isDisabled(): boolean {
    return this.username === '' || this.password === ''
  }

  onButtonClick(): void {
    const user: IUser = {
      username: this.username,
      password: this.password
    };

    if (this.authService.login(user))
      this.router.navigate(['dashboard', { username: user.username }]);
    else
      alert('error');
  }
}
