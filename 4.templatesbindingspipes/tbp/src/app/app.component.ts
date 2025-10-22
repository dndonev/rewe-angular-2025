import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'tbp';
  inputValue: string = 'my input';
  placeholder: string = 'Please enter a name';
  isDisabled: boolean = true;
  isActive: boolean = true;
  fontSize: string = '24px';
  user = {
    name: 'Dobri',
    age: 26,

  } as any
  color: string = 'pink';
  keyUpPlaceholder: string = 'on key up';

  today: Date = new Date();

  amount: number = 0.68;
  myNumber: number = 5;
  myPower: number = 5;
  currencyCode: string = 'EUR';

  myPromise$: Promise<number> = Promise.resolve(5);

  public onKeyUp() {
    console.log('oon key uped')
  }

  public alertForClicked() {
    alert('Clicked');
  }
}
