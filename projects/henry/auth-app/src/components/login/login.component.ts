import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {IUser} from "../../types/user.types";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(public authService: AuthService,
              private router: Router,
              private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.authService.getLoggedInSubject()
      .subscribe((isUserLoggedIn) =>
      {
        this.isLoggedIn = isUserLoggedIn;

        if(this.isLoggedIn) {
          this.router.navigate(['dashboard', { username: this.form.get('username')?.value}]);
        }
      })
  }

  onSubmit(): void {
    const username = this.form.get('username')?.value;
    const password =  this.form.get('password')?.value;

    if (!username && !password) return;

    const user: IUser = {
      username,
      password
    }

    this.authService.login(user);
    console.log(this.form)
  }

  onRegisterClick(): void {

    this.router.navigate(['register'])
  }



}
