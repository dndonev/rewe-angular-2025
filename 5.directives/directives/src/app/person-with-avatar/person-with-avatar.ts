import { Component, Input } from '@angular/core';
import { TPerson } from '../app';

@Component({
  selector: 'app-person-with-avatar',
  imports: [],
  templateUrl: './person-with-avatar.html',
  styleUrl: './person-with-avatar.scss',
})
export class PersonWithAvatar {
  @Input() person!: TPerson;
}
