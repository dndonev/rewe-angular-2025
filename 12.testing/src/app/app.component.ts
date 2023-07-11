import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = '12.testing';

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.userService.getUser().subscribe((res) => {
      console.log(res);
    });
  }
}
