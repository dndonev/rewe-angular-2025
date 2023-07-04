import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { increment, decrement, reset } from './state/counter.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '11.ngrx';

  counter$: Observable<number>;
  subscription: Subscription = new Subscription();

  constructor(private store: Store<{ counter: number }>) {
    this.counter$ = store.select('counter')
  }

  increment() {
    this.store.dispatch(increment())
  }

  decrement() {
    this.store.dispatch(decrement())
  }

  reset() {
    this.store.dispatch(reset())
  }
}
