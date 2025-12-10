import { Component, Input } from '@angular/core';
import { TPerson } from '../app';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person',
  imports: [CommonModule],
  templateUrl: './person.html',
  styleUrl: './person.scss',
})
export class Person {
  @Input() person?: TPerson = {
    name: 'John Doe',
    age: 30,
    city: 'New York'
  }
}
