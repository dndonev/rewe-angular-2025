import { Component, OnInit } from '@angular/core';
import { Subscription, first, map, from, interval, of, range } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = '9.observables';
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    // const obs1 = of(1);
    const obs2 = from([1,2,3]);
    // const obs3 = from([4, 5, 6]);

    // const obs = forkJoin({
    //   obs1,
    //   obs2,
    //   obs3
    // });

    const sub = obs2
      .pipe(first(), map(x => x * 2))
      .subscribe((value) => console.log('EMITTED VALUE', value));

    this.subscription.add(sub)
  }
}
