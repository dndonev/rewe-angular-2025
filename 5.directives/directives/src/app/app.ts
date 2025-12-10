import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { PersonWithAvatar } from './person-with-avatar/person-with-avatar';
import { Person } from './person/person';

export type TPerson = {
  name: string;
  age: number;
  city: string;
}
@Component({
  selector: 'app-root',
  imports: [CommonModule, PersonWithAvatar, Person],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('directives');

  showParagraph: boolean = true;
  selectedColor: string = 'red';
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  person: TPerson = {
    name: 'John Doe',
    age: 30,
    city: 'New York'
  };
}
