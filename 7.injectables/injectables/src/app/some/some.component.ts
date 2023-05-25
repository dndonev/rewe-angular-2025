import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { IPersonDetails } from '../types';

@Component({
  selector: 'app-some',
  templateUrl: './some.component.html',
  styleUrls: ['./some.component.scss']
})
export class SomeComponent implements OnInit {
  person: IPersonDetails | undefined;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPerson()
      .then((person) => this.person = person)
      .catch((error) => console.error(error));
  }
}
