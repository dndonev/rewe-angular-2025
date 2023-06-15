import { Component } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { IUser } from 'src/types/user.types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    form: FormGroup = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]]
      })
    
      constructor(public authService: AuthService, private router: Router, private fb: NonNullableFormBuilder) {
      }
    
      onSubmit(): void {
        // const username = this.form.get('username')?.value;
        // const password = this.form.get('password')?.value;
    
        // if(!username && !password) return;
    
        // const user: IUser = {
        //   username,
        //   password
        // };
    
        // if (this.authService.login(user))
        //   this.router.navigate(['dashboard', { username: user.username }]);
        // else
        //   alert('error');
    
        console.log(this.form);
      }
}
