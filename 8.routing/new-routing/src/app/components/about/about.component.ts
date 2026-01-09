import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(private router: Router) {}
  
  navigateToHome() {
    this.router.navigate(['/']);
  }
  
  navigateToProducts() {
    this.router.navigate(['/products']);
  }
  
  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
