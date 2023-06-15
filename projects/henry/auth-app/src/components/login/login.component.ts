import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {IUser} from "../../types/user.types";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(public authService: AuthService,
              private router: Router,
              private fb: NonNullableFormBuilder) {}

  onSubmit(): void {
    const username = this.form.get('username')?.value;
    const password =  this.form.get('password')?.value;

    if (!username && !password) return;

    const user: IUser = {
      username,
      password
    }

    if (this.authService.login(user))
      this.router.navigate(['dashboard', { username: user.username }]);
    else
      alert('error');

    console.log(this.form)
  }

  onRegisterClick(): void {

    this.router.navigate(['register'])
  }

}
