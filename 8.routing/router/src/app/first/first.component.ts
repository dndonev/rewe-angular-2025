import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent {

  constructor(private router: Router) {}

  id = 10;

  navigateToThird() {
    this.router.navigate(['person', 'details', this.id]);
  }

}
