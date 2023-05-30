import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private fetchService: FetchService
    ) { }
  
  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'];

    this.fetchService.getPersonDetails(id);
  }
}
