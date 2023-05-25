import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public personService: PersonService,
    private utilsService: UtilsService
  ) { }

  title = 'injectables';

  // useEffect(() => {}, []);
  ngOnInit(): void {
    this.personService.getPerson()
      .then((person) => console.log(person))
      .catch((error) => console.error(error));

    const time = new Date();
    console.log(this.utilsService.convertToUTC(time));
  }
}
