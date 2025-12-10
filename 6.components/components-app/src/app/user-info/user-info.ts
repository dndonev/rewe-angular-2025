import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

interface IUser {
  id: number;
  name: string;
}
@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss',
})
export class UserInfo implements OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked {

  @Input() user!: IUser;

  constructor() {
    console.log('constructor');
  }

  ngOnInit(): void {
    window.document.addEventListener('click', () => {
      console.log('click');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('currentValue', changes['user'].currentValue);
    console.log('previousValue', changes['user'].previousValue);
    console.log('firstChange', changes['user'].firstChange);
    console.log('isFirstChange', changes['user'].isFirstChange());
  }

  ngOnDestroy(): void {
    window.document.removeEventListener('click', () => {
      console.log('click');
    });
  }
}
