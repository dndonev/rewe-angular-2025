import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

/**
 * App Component - Root component of the application
 * 
 * This component serves as the main entry point and demonstrates
 * how to compose components in an Angular application.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Angular Testing Tutorial');

  /**
   * Get Angular version for footer display
   */
  getAngularVersion(): string {
    return '20.3.0';
  }
}
