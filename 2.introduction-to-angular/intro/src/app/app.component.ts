import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo App';
  placeholder = 'Enter your todo';
  buttonText = 'Click me';

  onButtonClick() {
    this.title = 'Hello World';
  };
}
