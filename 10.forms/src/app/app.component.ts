import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = '10.forms';

  subscription: Subscription = new Subscription();
  showAdditionalField: boolean = false;

  constructor(private fb: FormBuilder) { }

  // oldForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.min(8)]),
  //   address: new FormGroup({
  //     street: new FormControl(null, [Validators.required]),
  //     number: new FormControl(null, [Validators.required]),
  //   })
  // });

  loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.email]],
    password: [null, [Validators.required, Validators.min(8)]],
  });

  ngOnInit(): void {
    this.subscription.add(this.loginForm.valueChanges
      .subscribe((value) => {
        if (value.email.includes('admin')) {
          this.showAdditionalField = true;
        }
        console.log('asdf')
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isFormControlInvalid(formControlName: string): boolean {
    const formControl = this.loginForm.get(formControlName);
    if (!formControl) return false;

    return formControl.touched && !formControl.valid;
  }
}
