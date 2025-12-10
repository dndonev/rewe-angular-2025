import { Component, OnInit } from '@angular/core';
import { UserInfo } from './user-info/user-info';


@Component({
  selector: 'app-root',
  imports: [UserInfo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  user = {
    id: 1,
    name: 'John Doe'
  }

  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  changeUser() {
    // does NOT trigger ngOnChanges
    // this.user.id = 2;

    // does TRIGGER ngOnChanges
    // this.user = {
    //   id: 2,
    //   name: 'Jane Doe'
    // }
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.changeUser();
    }, 2000);
  }
}
