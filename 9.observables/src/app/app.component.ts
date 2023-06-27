import { Component, OnInit } from '@angular/core';
import { Subscription, of, delay, ReplaySubject } from 'rxjs';

interface User {
  name: string;
  loggedIn: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = '9.observables';
  subscription: Subscription = new Subscription();

  getData(param: number) {
    return of('retrieved new data with param ' + param).pipe(delay(Math.random() * 1000));
  }

  ngOnInit(): void {

    const user: User = {
      name: 'Brian',
      loggedIn: false,
    };

    const subject = new ReplaySubject<User>(3);

    subject.subscribe(user => console.log('observer 1: ' + user.loggedIn));
    subject.next({ ...user, loggedIn: true });
    subject.next({ ...user, loggedIn: false });
    subject.next({ ...user, loggedIn: true });

    subject.subscribe(user => console.log('observer 2: ' + user.loggedIn));
  }
}
