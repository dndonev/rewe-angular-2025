import { Component } from '@angular/core';

type User = {
    firstName: string;
    lastName: string;
    age: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {

  public today: Date = new Date();
  public text: string = 'asdfasdfasdf';
  public amount: number = 52000;
  public myPromise$: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
  public user: User = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
  };

  public onButtonClick() {
    console.log('Button clicked');
  }

}
