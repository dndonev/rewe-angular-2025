import { AfterContentInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPerson } from './types/person.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'components-app';
  person: IPerson = {
    name: 'John',
    age: 30,
    details: {
      address: '123 Main St',
      phone: '555-555-5555'
    }
  };

  constructor() {
    console.log('AppComponent constructor');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.person = {
        name: 'Jane',
        age: 25,
        details: {
          address: '456 Main St',
          phone: '555-555-5555'
        }
      }
    }, 2000);
  }

  onPersonDetailsChange(message: string) {
    console.log('[FROM PARENT]', message);
  }
}
